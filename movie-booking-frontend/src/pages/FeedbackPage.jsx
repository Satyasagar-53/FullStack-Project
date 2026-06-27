import React, { useState, useEffect } from "react";

const FeedbackPage = ({ user, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [reviewsList, setReviewsList] = useState([]);

  // --- INITIAL FEEDBACK LOADER ---
  useEffect(() => {
    // Set default selected movie once available
    if (movies && movies.length > 0) {
      setSelectedMovie(movies[0].title);
    }

    // Try fetching from database first; Fallback to browser storage if database isn't serving yet
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/feedback");
        if (response.ok) {
          const data = await response.json();
          setReviewsList(data);
          return;
        }
      } catch (err) {
        console.log("Database fetch unavailable, pulling from localStorage fallback.");
      }

      // Local storage persistence fallback
      const savedReviews = localStorage.getItem("cinemax_reviews");
      if (savedReviews) {
        setReviewsList(JSON.parse(savedReviews));
      } else {
        // Initial setup mock data matching your UI feeds
        const initialMock = [
          { id: 1, username: "Chiku", movieTitle: "Interstellar", rating: 5, comment: "Absolutely mind-bending masterpiece! Best IMAX visual trip ever" },
          { id: 2, username: "Alex", movieTitle: "Inception", rating: 4, comment: "Superb pacing and brilliant sound tracks. Ending still leaves me questioning reality." }
        ];
        setReviewsList(initialMock);
        localStorage.setItem("cinemax_reviews", JSON.stringify(initialMock));
      }
    };

    fetchReviews();
  }, [movies]);

  // --- SUBMIT AND SAVE TRANSACTION ---
  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim() || rating === 0) {
      alert("Please choose a rating level and write your feedback review.");
      return;
    }

    const newReviewItem = {
      id: Date.now(),
      username: user ? user.name : "Guest User",
      movieTitle: selectedMovie,
      rating: rating,
      comment: feedbackText.trim()
    };

    // Update state display array
    const updatedList = [newReviewItem, ...reviewsList];
    setReviewsList(updatedList);

    // GUARANTEED LOCAL STORAGE SAVE (Prevents disappearing on view switch/exit)
    localStorage.setItem("cinemax_reviews", JSON.stringify(updatedList));

    // Optional Database Hook synchronization
    try {
      await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReviewItem)
      });
    } catch (err) {
      console.log("Review saved locally. Database endpoint post skipped.");
    }

    // Clear text area input fields
    setFeedbackText("");
    setRating(0);
    alert("Review saved safely into system storage!");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "30px", marginTop: "20px", alignItems: "start" }}>

      {/* LEFT: SUBMIT GUEST REVIEW PANEL */}
      <div style={{ background: "linear-gradient(145deg, rgba(22, 30, 49, 0.6), rgba(15, 23, 42, 0.4))", backdropFilter: "blur(16px)", padding: "25px", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.05)", boxShadow: "0 15px 30px rgba(0,0,0,0.25)" }}>
        <h3 style={{ color: "#06b6d4", fontSize: "1rem", fontWeight: "800", letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "8px" }}>
          ✍️ Submit Guest Review
        </h3>

        <form onSubmit={handlePostReview} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: "700", marginBottom: "6px" }}>Select Targeted Movie</label>
            <select
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              style={{ width: "100%", padding: "11px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.85rem" }}
            >
              {movies.map((m, idx) => (
                <option key={idx} value={m.title} style={{ backgroundColor: "#0f172a" }}>{m.title}</option>
              ))}
            </select>
          </div>

          {/* RATING INTERFACE */}
          <div>
            <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: "700", marginBottom: "6px" }}>Rating Level</label>
            <div style={{ display: "flex", gap: "6px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ fontSize: "1.5rem", cursor: "pointer", color: star <= rating ? "#f59e0b" : "#334155", transition: "color 0.15s ease" }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: "700", marginBottom: "6px" }}>Write Feedback</label>
            <textarea
              rows="4"
              placeholder="Write feedback within 50 words..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              maxLength={250}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.85rem", resize: "none", boxSizing: "border-box" }}
            />
            <div style={{ textAlign: "right", color: "#475569", fontSize: "0.75rem", marginTop: "4px" }}>
              {feedbackText.length}/250 chars
            </div>
          </div>

          <button
            type="submit"
            style={{ width: "100%", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", padding: "12px", border: "none", borderRadius: "8px", fontWeight: "800", cursor: "pointer", fontSize: "0.9rem", marginTop: "6px" }}
          >
            Post Review
          </button>
        </form>
      </div>

      {/* RIGHT: LIVE AUDIENCE CRITIC FEED (Persistent List View) */}
      <div style={{ background: "linear-gradient(145deg, rgba(22, 30, 49, 0.6), rgba(15, 23, 42, 0.4))", backdropFilter: "blur(16px)", padding: "25px", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.05)", boxShadow: "0 15px 30px rgba(0,0,0,0.25)" }}>
        <h3 style={{ color: "#e2e8f0", fontSize: "1rem", fontWeight: "800", letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "8px" }}>
          💬 Live Audience Critic Feed
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "460px", overflowY: "auto", paddingRight: "4px" }}>
          {reviewsList.map((rev) => (
            <div key={rev.id} style={{ backgroundColor: "rgba(9, 13, 22, 0.6)", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                  <strong style={{ color: "#ffffff" }}>{rev.username}</strong> reviewed <span style={{ color: "#06b6d4", fontWeight: "600" }}>{rev.movieTitle}</span>
                </span>
                <span style={{ color: "#f59e0b", fontSize: "0.85rem" }}>
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </span>
              </div>
              <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.85rem", lineHeight: "1.5", fontStyle: "italic" }}>
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FeedbackPage;