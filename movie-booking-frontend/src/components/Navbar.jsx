import React from "react";

const Navbar = ({ currentView, onViewChange, user, onLogoutClick, onSignInClick, onToggleLogs }) => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      marginBottom: "35px",
      paddingBottom: "20px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* BRANDING LOGO */}
      <div
        onClick={() => onViewChange("movies")}
        style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
      >
        <div style={{
          background: "linear-gradient(135deg, #06b6d4, #0891b2)",
          padding: "10px 14px",
          borderRadius: "12px",
          fontSize: "1.3rem",
          fontWeight: "900",
          color: "#070a13",
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.25)"
        }}>
          CX
        </div>
        <h1 style={{ margin: 0, background: "linear-gradient(90deg, #ffffff, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "900", letterSpacing: "2px", fontSize: "1.6rem" }}>
          CINEMAX
        </h1>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={() => onViewChange("movies")}
          style={{
            background: "none",
            border: "none",
            color: currentView === "movies" ? "#06b6d4" : "#94a3b8",
            fontWeight: "700",
            fontSize: "0.9rem",
            cursor: "pointer",
            padding: "8px 14px",
            borderBottom: currentView === "movies" ? "2px solid #06b6d4" : "2px solid transparent",
            transition: "all 0.2s ease"
          }}
        >
          🎬 Movies
        </button>

        <button
          onClick={() => onViewChange("feedback")}
          style={{
            background: "none",
            border: "none",
            color: currentView === "feedback" ? "#06b6d4" : "#94a3b8",
            fontWeight: "700",
            fontSize: "0.9rem",
            cursor: "pointer",
            padding: "8px 14px",
            borderBottom: currentView === "feedback" ? "2px solid #06b6d4" : "2px solid transparent",
            transition: "all 0.2s ease"
          }}
        >
          ⭐ Reviews & Feedback
        </button>

        <span style={{ width: "1px", height: "18px", backgroundColor: "rgba(255, 255, 255, 0.1)", margin: "0 8px" }}></span>

        <button
          onClick={onToggleLogs}
          style={{
            backgroundColor: "#f59e0b",
            color: "#070a13",
            border: "none",
            padding: "9px 16px",
            borderRadius: "10px",
            fontWeight: "700",
            fontSize: "0.82rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = "translateY(-1px)"}
          onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
        >
          Manage Bookings
        </button>

        {user ? (
          <>
            <span style={{ color: "#34d399", fontSize: "0.82rem", fontWeight: "700", backgroundColor: "rgba(52, 211, 153, 0.08)", padding: "8px 14px", borderRadius: "10px", border: "1px solid rgba(52, 211, 153, 0.15)" }}>
              ● {user.username.toUpperCase()}
            </span>
            <button
              onClick={onLogoutClick}
              style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "9px 16px", borderRadius: "10px", fontWeight: "600", fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s ease" }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={onSignInClick}
            style={{ background: "linear-gradient(135deg, #06b6d4, #0284c7)", color: "white", border: "none", padding: "9px 16px", borderRadius: "10px", fontWeight: "600", fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s ease" }}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;