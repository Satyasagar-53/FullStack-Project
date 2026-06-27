import React, { useState } from "react";

const MovieCard = ({ movie, onBookClick, onRemoveClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasTickets = movie.availableTickets > 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "linear-gradient(145deg, #101624, #0d1220)",
        border: isHovered ? "1px solid #06b6d4" : "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 15px 25px rgba(6, 182, 212, 0.15)"
          : "0 8px 20px rgba(0, 0, 0, 0.35)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {/* TOP STATUS BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ backgroundColor: "rgba(6, 182, 212, 0.08)", border: "1px solid rgba(6, 182, 212, 0.15)", padding: "4px 10px", borderRadius: "20px" }}>
          <span style={{ color: "#22d3ee", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.3px" }}>
            {movie.genre ? movie.genre.toUpperCase() : "CINEMA"}
          </span>
        </div>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: hasTickets ? "#10b981" : "#ef4444" }}></div>
      </div>

      {/* GRAPHIC ELEMENT */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
          🎬
        </div>
      </div>

      {/* ALIGNED TITLE BLOCK */}
      <div style={{ minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
        <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "800", color: "#ffffff", textAlign: "center", lineHeight: "1.2" }}>
          {movie.title}
        </h3>
      </div>

      {/* PRICING AND CAPACITY BOX */}
      <div style={{ backgroundColor: "rgba(7, 10, 19, 0.4)", borderRadius: "10px", padding: "12px 14px", marginBottom: "18px", border: "1px solid rgba(255,255,255,0.01)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", marginBottom: "8px" }}>
          <span style={{ color: "#64748b", fontWeight: "600" }}>Price</span>
          <span style={{ color: "#f59e0b", fontWeight: "800", fontSize: "0.95rem" }}>${movie.price}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
          <span style={{ color: "#64748b", fontWeight: "600" }}>Seats left</span>
          <span style={{ color: hasTickets ? "#34d399" : "#f87171", fontWeight: "700" }}>
            {hasTickets ? movie.availableTickets : "Sold Out"}
          </span>
        </div>
      </div>

      {/* ACTIONS HOUSING */}
      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => onBookClick(movie)}
          disabled={!hasTickets}
          style={{
            width: "100%",
            background: hasTickets ? "linear-gradient(135deg, #06b6d4, #0284c7)" : "#1e293b",
            color: hasTickets ? "white" : "#64748b",
            padding: "11px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: hasTickets ? "pointer" : "not-allowed",
            fontSize: "0.85rem",
            transition: "all 0.2s ease"
          }}
        >
          {hasTickets ? "🎟️ Book Ticket" : "Sold Out"}
        </button>

        <button
          onClick={() => onRemoveClick(movie.id)}
          style={{
            background: "rgba(239, 68, 68, 0.05)",
            color: "rgba(239, 68, 68, 0.65)",
            border: "1px solid rgba(239, 68, 68, 0.15)",
            width: "100%",
            padding: "7px 0",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "0.78rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.05)";
            e.currentTarget.style.color = "rgba(239, 68, 68, 0.65)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.15)";
          }}
        >
          🗑️ Remove Movie
        </button>
      </div>
    </div>
  );
};

export default MovieCard;