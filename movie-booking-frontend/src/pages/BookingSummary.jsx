import React from "react";

const BookingSummary = ({ booking, onHomeClick }) => {
  const handleConfirmFinalBooking = async () => {
    try {
      const logResponse = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieTitle: booking.movie.title,
          seatsBooked: booking.selectedSeats.join(", "),
          totalAmount: booking.totalAmount
        })
      });

      if (logResponse.ok) {
        const updatedCapacity = booking.movie.availableTickets - booking.selectedSeats.length;
        await fetch("http://localhost:8080/api/movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: booking.movie.id,
            title: booking.movie.title,
            genre: booking.movie.genre,
            price: booking.movie.price,
            availableTickets: updatedCapacity >= 0 ? updatedCapacity : 0
          })
        });

        alert("🎉 Reservation finalized! Ledger contexts updated.");
        onHomeClick();
      }
    } catch (err) {
      alert("Error committing transactions to cluster instance.");
    }
  };

  return (
    <div style={{ color: "white", padding: "60px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#0f172a", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 25px 50px rgba(0,0,0,0.5)", textAlign: "center" }}>

        <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🎫</div>
        <h2 style={{ color: "#10b981", margin: "0 0 5px 0", fontWeight: "800", fontSize: "1.6rem", letterSpacing: "0.5px" }}>Order Verification</h2>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: 0 }}>Review items prior to checkout validation</p>

        <hr style={{ borderColor: "rgba(255,255,255,0.05)", margin: "25px 0" }} />

        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "16px", marginBottom: "35px", backgroundColor: "#070a13", padding: "20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Film Selection</span>
            <strong style={{ color: "#f3f4f6" }}>{booking?.movie?.title}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Allocated Chairs</span>
            <strong style={{ color: "#06b6d4" }}>{booking?.selectedSeats?.join(", ")}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>Aggregate Balance</span>
            <strong style={{ color: "#f59e0b", fontSize: "1.4rem" }}>${booking?.totalAmount?.toFixed(2)}</strong>
          </div>
        </div>

        <button onClick={handleConfirmFinalBooking} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", border: "none", fontWeight: "700", borderRadius: "12px", cursor: "pointer", marginBottom: "15px", fontSize: "1rem", boxShadow: "0 4px 15px rgba(16,185,129,0.3)" }}>Confirm & Pay</button>
        <button onClick={onHomeClick} style={{ width: "100%", background: "none", color: "#6b7280", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }} onMouseEnter={(e)=>e.target.style.color='#9ca3af'} onMouseLeave={(e)=>e.target.style.color='#6b7280'}>Cancel & Terminate</button>
      </div>
    </div>
  );
};

export default BookingSummary;