import React, { useState } from "react";

const BookingModal = ({ movie, selectedSeats = [], onClose, onConfirmPayment }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const seatCount = selectedSeats.length > 0 ? selectedSeats.length : 1; // Default fallback to 1 seat
  const baseTotal = movie.price * seatCount;

  // Calculate 10% discount if code matches CUTM45
  const discountAmount = isApplied ? baseTotal * 0.10 : 0;
  const finalTotal = baseTotal - discountAmount;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "CUTM45") {
      setIsApplied(true);
      setCouponError("");
    } else {
      setIsApplied(false);
      setCouponError("Invalid coupon code! Try CUTM45.");
    }
  };

  const handleRemoveCoupon = () => {
    setIsApplied(false);
    setCouponCode("");
    setCouponError("");
  };

  const handlePaymentSubmit = () => {
    // Send final calculated total upward to backend or state logger
    onConfirmPayment({
      movieId: movie.id,
      movieTitle: movie.title,
      seatsBooked: selectedSeats.join(",") || "General Admission",
      totalAmount: finalTotal.toFixed(2),
      couponUsed: isApplied ? "CUTM45" : "None"
    });
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(3, 7, 18, 0.85)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "16px", width: "90%", maxWidth: "460px", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>

        {/* MODAL HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, color: "#ffffff", fontSize: "1.3rem", fontWeight: "800" }}>🎟️ Secure Checkout</h3>
          <button onClick={onClose} style={{ background: "none", color: "#94a3b8", border: "none", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
        </div>

        {/* MOVIE BRIEF */}
        <div style={{ backgroundColor: "#1e293b", padding: "14px", borderRadius: "10px", marginBottom: "20px" }}>
          <div style={{ fontSize: "0.75rem", color: "#06b6d4", fontWeight: "800", letterSpacing: "1px", marginBottom: "4px" }}>SELECTED SHOW</div>
          <div style={{ color: "#ffffff", fontWeight: "700", fontSize: "1.1rem" }}>{movie.title}</div>
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "4px" }}>
            Seats: <span style={{ color: "#f59e0b", fontWeight: "700" }}>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "1 Seat"}</span>
          </div>
        </div>

        {/* COUPON SECTION */}
        <div style={{ borderTop: "1px dashed rgba(255,255,255,0.1)", borderBottom: "1px dashed rgba(255,255,255,0.1)", padding: "16px 0", marginBottom: "20px" }}>
          <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: "700", marginBottom: "8px" }}>🎁 OFFER & COUPON SECTION</label>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Enter code (e.g. CUTM45)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isApplied}
              style={{ flex: 1, padding: "10px 12px", borderRadius: "8px", backgroundColor: "#090d16", border: isApplied ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.08)", color: isApplied ? "#10b981" : "white", outline: "none", fontSize: "0.85rem", fontWeight: isApplied ? "700" : "400" }}
            />
            {isApplied ? (
              <button onClick={handleRemoveCoupon} style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "0 14px", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "700" }}>Remove</button>
            ) : (
              <button onClick={handleApplyCoupon} style={{ backgroundColor: "#06b6d4", color: "white", border: "none", padding: "0 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "700" }}>Apply</button>
            )}
          </div>

          {/* COUPON FEEDBACK MESSAGES */}
          {isApplied && (
            <div style={{ color: "#10b981", fontSize: "0.78rem", fontWeight: "600", marginTop: "6px" }}>
              🎉 Code applied successfully! You saved 10%.
            </div>
          )}
          {couponError && (
            <div style={{ color: "#ef4444", fontSize: "0.78rem", fontWeight: "600", marginTop: "6px" }}>
              ❌ {couponError}
            </div>
          )}
        </div>

        {/* PRICE SUMMARY BALANCE SHEET */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#94a3b8" }}>
            <span>Ticket Base Price ({seatCount}x)</span>
            <span>${baseTotal.toFixed(2)}</span>
          </div>

          {isApplied && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#10b981", fontWeight: "600" }}>
              <span>Coupon Discount (10%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", color: "#ffffff", fontWeight: "800", marginTop: "4px", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <span>Grand Total</span>
            <span style={{ color: "#f59e0b" }}>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* PAY AND SUBMIT TRANSACTION BUTTON */}
        <button
          onClick={handlePaymentSubmit}
          style={{ width: "100%", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", padding: "12px", border: "none", borderRadius: "8px", fontWeight: "800", cursor: "pointer", fontSize: "0.95rem", boxShadow: "0 4px 15px rgba(16, 185, 129, 0.25)" }}
        >
          💳 Confirm payment (${finalTotal.toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default BookingModal;