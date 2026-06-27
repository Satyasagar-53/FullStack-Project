import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FeedbackPage from "./FeedbackPage";
import MovieGrid from "../components/MovieGrid";

const Home = ({ user, onSignInClick, onLogoutClick }) => {
  const [currentView, setCurrentView] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: "", genre: "", price: "", availableTickets: "" });

  // Checkout & Reservation State
  const [activeCheckoutMovie, setActiveCheckoutMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Logs state
  const [showLogs, setShowLogs] = useState(false);
  const [bookingLogs, setBookingLogs] = useState([]);

  // Hardcoded seat arrangement template map (Rows A, B, C)
  const seatRows = {
    "Row A": ["A1", "A2", "A3", "A4", "A5", "A6"],
    "Row B": ["B1", "B2", "B3", "B4", "B5", "B6"],
    "Row C": ["C1", "C2", "C3", "C4", "C5", "C6"]
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/movies");
      if (response.ok) {
        const data = await response.json();
        setMovies(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const fetchBookingLogs = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/bookings");
      if (response.ok) {
        const data = await response.json();
        setBookingLogs(data);
        setShowLogs(true);
      }
    } catch (err) {
      alert("Could not retrieve reservation logs.");
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newMovie.title,
          genre: newMovie.genre,
          price: parseFloat(newMovie.price || 0),
          availableTickets: parseInt(newMovie.availableTickets || 0)
        }),
      });

      if (response.ok) {
        setNewMovie({ title: "", genre: "", price: "", availableTickets: "" });
        fetchMovies();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveMovie = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movies/${id}`, { method: "DELETE" });
      if (response.ok) fetchMovies();
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  const handleInitiateBooking = (movie) => {
    if (!user) {
      alert("Please sign in first before booking a ticket!");
      onSignInClick();
      return;
    }
    setActiveCheckoutMovie(movie);
    setSelectedSeats([]);
    setCouponCode("");
    setIsCouponApplied(false);
    setCouponError("");
  };

  const handleToggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      if (selectedSeats.length >= activeCheckoutMovie.availableTickets) {
        alert("Cannot select more seats than remaining available tickets!");
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "CUTM45") {
      setIsCouponApplied(true);
      setCouponError("");
    } else {
      setIsCouponApplied(false);
      setCouponError("Invalid code! Try using CUTM45");
    }
  };

  const handleFinalizePayment = async () => {
    if (!activeCheckoutMovie) return;
    if (selectedSeats.length === 0) {
      alert("Please choose at least one seat from the row layout layout below!");
      return;
    }

    const basePrice = activeCheckoutMovie.price * selectedSeats.length;
    const discount = isCouponApplied ? basePrice * 0.10 : 0;
    const finalCalculatedTotal = basePrice - discount;

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieTitle: activeCheckoutMovie.title,
          seatsBooked: selectedSeats.join(", "),
          totalAmount: finalCalculatedTotal.toFixed(2),
          username: user.name
        }),
      });

      if (response.ok) {
        await fetch("http://localhost:8080/api/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...activeCheckoutMovie,
            availableTickets: activeCheckoutMovie.availableTickets - selectedSeats.length
          })
        });

        alert(`Successfully booked seats (${selectedSeats.join(", ")})! Paid: $${finalCalculatedTotal.toFixed(2)}`);
        setActiveCheckoutMovie(null);
        fetchMovies();
      }
    } catch (err) {
      console.error("Checkout transaction error:", err);
    }
  };

  const handleCancelBooking = async (bookingId, movieTitle, seatsBooked) => {
    const confirmCancel = window.confirm(`Cancel booking for "${movieTitle}"?`);
    if (!confirmCancel) return;

    try {
      const deleteResponse = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, { method: "DELETE" });
      if (deleteResponse.ok) {
        const seatsCount = seatsBooked.split(",").length;
        const matchingMovie = movies.find(m => m.title === movieTitle);

        if (matchingMovie) {
          await fetch("http://localhost:8080/api/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...matchingMovie, availableTickets: matchingMovie.availableTickets + seatsCount })
          });
        }
        alert("Booking canceled successfully.");
        fetchMovies();
        fetchBookingLogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  // Compute values based on number of selected seats
  const ticketCount = selectedSeats.length;
  const basePrice = activeCheckoutMovie ? activeCheckoutMovie.price * ticketCount : 0;
  const discountAmount = isCouponApplied ? basePrice * 0.10 : 0;
  const grandTotal = basePrice - discountAmount;

  return (
    <div style={{ backgroundColor: "#0b0f19", color: "#f1f5f9", padding: "20px 40px", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh", boxSizing: "border-box" }}>

      <Navbar currentView={currentView} onViewChange={setCurrentView} user={user} onLogoutClick={onLogoutClick} onSignInClick={onSignInClick} onToggleLogs={fetchBookingLogs} />

      {currentView === "feedback" ? (
        <FeedbackPage user={user} movies={movies} />
      ) : (
        <div style={{ transition: "all 0.3s ease" }}>
          {/* CONTROL PANEL HEADER FORM */}
          <form onSubmit={handleAddMovie} style={{ background: "linear-gradient(145deg, rgba(22, 30, 49, 0.6), rgba(15, 23, 42, 0.4))", backdropFilter: "blur(16px)", padding: "18px 22px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.05)", marginBottom: "30px", boxShadow: "0 15px 30px rgba(0,0,0,0.25)" }}>
            <h4 style={{ margin: "0 0 12px 0", color: "#06b6d4", fontSize: "0.8rem", fontWeight: "800", letterSpacing: "1.2px" }}>+ ADD NEW THEATRE RELEASE</h4>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr 120px", gap: "12px" }}>
              <input type="text" placeholder="Movie Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} required style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.85rem" }} />
              <input type="text" placeholder="Genre" value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} required style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.85rem" }} />
              <input type="number" step="0.01" placeholder="Price ($)" value={newMovie.price} onChange={(e) => setNewMovie({ ...newMovie, price: e.target.value })} required style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.85rem" }} />
              <input type="number" placeholder="Seats" value={newMovie.availableTickets} onChange={(e) => setNewMovie({ ...newMovie, availableTickets: e.target.value })} required style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.85rem" }} />
              <button type="submit" style={{ background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "0.85rem" }}>Add Movie</button>
            </div>
          </form>

          <MovieGrid movies={movies} onBookClick={handleInitiateBooking} onRemoveClick={handleRemoveMovie} />
        </div>
      )}

      {/* 🎟️ INTERACTIVE PROCEED TO PAYMENT OVERLAY MODAL WITH ROW SEAT SELECTION */}
      {activeCheckoutMovie && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(3, 7, 18, 0.85)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "16px", width: "95%", maxWidth: "480px", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 25px 50px rgba(0,0,0,0.5)", maxHeight: "90vh", overflowY: "auto" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ margin: 0, color: "#ffffff", fontSize: "1.2rem", fontWeight: "800" }}>🎟️ Proceed to Payment</h3>
              <button onClick={() => setActiveCheckoutMovie(null)} style={{ background: "none", color: "#94a3b8", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
            </div>

            <div style={{ backgroundColor: "#1e293b", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#06b6d4", fontWeight: "800" }}>SELECTED MOVIE</div>
                <div style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>{activeCheckoutMovie.title}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: "800" }}>UNIT PRICE</div>
                <div style={{ color: "#f59e0b", fontWeight: "700" }}>${activeCheckoutMovie.price}</div>
              </div>
            </div>

            {/* 🪑 ROW-BY-ROW SEAT CONTAINER */}
            <div style={{ backgroundColor: "#090d16", padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "16px" }}>
              <div style={{ textAlign: "center", color: "#64748b", fontSize: "0.7rem", fontWeight: "800", letterSpacing: "1.5px", marginBottom: "14px", padding: "4px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>🎬 SCREEN THIS WAY</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.entries(seatRows).map(([rowName, seats]) => (
                  <div key={rowName} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: "700", width: "45px" }}>{rowName}</span>
                    <div style={{ display: "flex", gap: "6px", flex: 1, justifyContent: "space-between" }}>
                      {seats.map(seatId => {
                        const isSelected = selectedSeats.includes(seatId);
                        return (
                          <button
                            key={seatId}
                            onClick={() => handleToggleSeat(seatId)}
                            style={{
                              flex: 1,
                              padding: "6px 0",
                              fontSize: "0.7rem",
                              fontWeight: "700",
                              borderRadius: "4px",
                              border: isSelected ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)",
                              backgroundColor: isSelected ? "rgba(6, 182, 212, 0.2)" : "rgba(30, 41, 59, 0.3)",
                              color: isSelected ? "#22d3ee" : "#94a3b8",
                              cursor: "pointer",
                              transition: "all 0.15s ease"
                            }}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "12px", textAlign: "center" }}>
                Selected Seats: <span style={{ color: "#06b6d4", fontWeight: "700" }}>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</span>
              </div>
            </div>

            {/* COUPON DISCOUNTS SECTION */}
            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.1)", borderBottom: "1px dashed rgba(255,255,255,0.1)", padding: "12px 0", marginBottom: "16px" }}>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.75rem", fontWeight: "700", marginBottom: "6px" }}>🎁 AVAILABLE OFFERS SECTION</label>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="Enter Coupon Code (CUTM45)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={isCouponApplied}
                  style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", backgroundColor: "#090d16", border: isCouponApplied ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.8rem" }}
                />
                {isCouponApplied ? (
                  <button onClick={() => { setIsCouponApplied(false); setCouponCode(""); }} style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "0 12px", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: "700" }}>Remove</button>
                ) : (
                  <button onClick={handleApplyCoupon} style={{ backgroundColor: "#06b6d4", color: "white", border: "none", padding: "0 12px", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: "700" }}>Apply</button>
                )}
              </div>
              {isCouponApplied && <div style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: "600", marginTop: "4px" }}>🎉 Coupon CUTM45 Applied! 10% Discount Saved.</div>}
              {couponError && <div style={{ color: "#ef4444", fontSize: "0.75rem", fontWeight: "600", marginTop: "4px" }}>❌ {couponError}</div>}
            </div>

            {/* BALANCE RECEIPT LEDGER */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "16px", fontSize: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                <span>Base Price ({ticketCount} Tickets):</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              {isCouponApplied && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981", fontWeight: "600" }}>
                  <span>Coupon Discount (10%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", color: "white", fontWeight: "800", paddingTop: "6px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span>Grand Pay Total:</span>
                <span style={{ color: "#f59e0b" }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleFinalizePayment}
              disabled={selectedSeats.length === 0}
              style={{ width: "100%", background: selectedSeats.length > 0 ? "linear-gradient(135deg, #10b981, #059669)" : "#1e293b", color: selectedSeats.length > 0 ? "white" : "#64748b", padding: "11px", border: "none", borderRadius: "8px", fontWeight: "800", cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed", fontSize: "0.85rem" }}
            >
              {selectedSeats.length > 0 ? `💳 Finalize & Pay $${grandTotal.toFixed(2)}` : "❌ Choose Seats to Continue"}
            </button>
          </div>
        </div>
      )}

      {/* SYSTEM RESERVATION LOGS MODAL */}
      {showLogs && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(3, 7, 18, 0.8)", backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 }}>
          <div style={{ backgroundColor: "#0f172a", padding: "25px", borderRadius: "14px", width: "90%", maxWidth: "550px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
              <h3 style={{ margin: 0, color: "#f59e0b", fontSize: "1.1rem", fontWeight: "800" }}>📜 System Reservation Logs</h3>
              <button onClick={() => setShowLogs(false)} style={{ background: "none", color: "#94a3b8", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
            </div>
            <div style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "5px" }}>
              {bookingLogs.length === 0 ? <p style={{ color: "#4b5563", textAlign: "center", fontSize: "0.85rem" }}>No logs found.</p> : (
                bookingLogs.map((log) => (
                  <div key={log.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ color: "#f3f4f6", fontSize: "0.85rem" }}>{log.movieTitle}</strong>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>Selected Seats: <span style={{ color: "#06b6d4" }}>{log.seatsBooked}</span></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: "#10b981", fontWeight: "700", fontSize: "0.85rem" }}>${log.totalAmount}</span>
                      <button onClick={() => handleCancelBooking(log.id, log.movieTitle, log.seatsBooked)} style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.25)", padding: "4px 8px", borderRadius: "6px", cursor: "pointer", fontSize: "0.7rem" }}>Cancel</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;