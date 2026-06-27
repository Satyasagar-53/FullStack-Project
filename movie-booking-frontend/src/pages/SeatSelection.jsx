import React, { useState } from "react";

const SeatSelection = ({ movie, onBackClick, onConfirmBooking, bookedSeats = ["S3", "S4", "S11", "S12"] }) => {
  const totalSeats = Array.from({ length: 24 }, (_, i) => "S" + (i + 1));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalAmount = selectedSeats.length * (movie?.price || 0);

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    onConfirmBooking({
      movie,
      selectedSeats,
      totalAmount
    });
  };

  return (
    <div style={{ color: "white", padding: "15px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: "700px", margin: "0 auto" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <button
          onClick={onBackClick}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", color: "#9ca3af", padding: "8px 16px", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "0.85rem" }}
        >
          ← Back
        </button>
        <div style={{ textAlign: "right" }}>
          <h2 style={{ margin: 0, fontWeight: "800", fontSize: "1.5rem" }}>{movie?.title}</h2>
          <div style={{ color: "#06b6d4", fontWeight: "700", fontSize: "0.85rem" }}>${movie?.price} / seat</div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(7, 10, 19, 0.8) 100%)", backdropFilter: "blur(20px)", padding: "25px 30px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>

        <div style={{ position: "relative", width: "80%", margin: "0 auto 25px auto", textAlign: "center" }}>
          <div style={{ width: "100%", height: "4px", background: "linear-gradient(90deg, transparent 5%, #06b6d4 35%, #22d3ee 50%, #06b6d4 65%, transparent 95%)", borderRadius: "50%", boxShadow: "0 4px 20px rgba(34, 211, 238, 0.7)" }}></div>
          <p style={{ color: "rgba(6, 182, 212, 0.4)", fontSize: "0.65rem", fontWeight: "800", letterSpacing: "6px", margin: "8px 0 0 0" }}>SCREEN</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px 10px", margin: "0 auto 25px auto", maxWidth: "480px" }}>
          {totalSeats.map((seat) => {
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);
            const isHovered = hoveredSeat === seat;

            let backgroundColor = "#0b1329";
            let color = "#94a3b8";
            let border = "1px solid rgba(255, 255, 255, 0.05)";

            if (isBooked) {
              backgroundColor = "rgba(239, 68, 68, 0.1)";
              color = "rgba(239, 68, 68, 0.4)";
              border = "1px solid rgba(239, 68, 68, 0.25)";
            } else if (isSelected) {
              backgroundColor = "#06b6d4";
              color = "#070a13";
              border = "1px solid #22d3ee";
            } else if (isHovered) {
              backgroundColor = "rgba(6, 182, 212, 0.12)";
              color = "#22d3ee";
              border = "1px solid rgba(6, 182, 212, 0.5)";
            }

            return (
              <button
                key={seat}
                onClick={() => handleSeatClick(seat)}
                onMouseEnter={() => !isBooked && setHoveredSeat(seat)}
                onMouseLeave={() => !isBooked && setHoveredSeat(null)}
                disabled={isBooked}
                style={{ padding: "10px 0", backgroundColor, color, border, borderRadius: "10px", fontWeight: "800", fontSize: "0.85rem", cursor: isBooked ? "not-allowed" : "pointer", transition: "all 0.15s ease" }}
              >
                {seat}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", maxWidth: "480px", margin: "0 auto 20px auto" }}>
          <div style={{ backgroundColor: "rgba(11, 19, 41, 0.5)", padding: "10px 15px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.03)" }}>
            <div style={{ color: "#4b5563", fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase" }}>Seats Chosen</div>
            <span style={{ fontWeight: "800", color: selectedSeats.length > 0 ? "#22d3ee" : "#4b5563", fontSize: "0.9rem" }}>{selectedSeats.join(", ") || "None"}</span>
          </div>
          <div style={{ backgroundColor: "rgba(11, 19, 41, 0.5)", padding: "10px 15px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.03)", textAlign: "right" }}>
            <div style={{ color: "#4b5563", fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase" }}>Total</div>
            <strong style={{ color: selectedSeats.length > 0 ? "#10b981" : "#4b5563", fontSize: "1.1rem" }}>${totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        <button
          disabled={selectedSeats.length === 0}
          onClick={handleCheckout}
          style={{ width: "100%", maxWidth: "480px", display: "block", margin: "0 auto", padding: "14px", background: selectedSeats.length > 0 ? "linear-gradient(135deg, #06b6d4, #0284c7)" : "#1e293b", border: "none", color: selectedSeats.length > 0 ? "white" : "#4b5563", fontWeight: "800", borderRadius: "12px", fontSize: "0.95rem", cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed" }}
        >
          Confirm & Proceed
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;