import React, { useState } from "react";

const LoginPage = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();

    if (!cleanUsername) return;

    // Check if the user is trying to access the administrator account
    if (cleanUsername.toLowerCase() === "admin") {
      if (password === "1234") {
        // Admin matches credentials perfectly
        setErrorMessage("");
        onLoginSuccess({ name: "Admin", role: "ADMIN" });
      } else {
        // Strict protection for admin credentials
        setErrorMessage("Invalid Admin Password!");
      }
    } else {
      // Anyone else logs in instantly as a guest ticket buyer!
      setErrorMessage("");
      onLoginSuccess({ name: cleanUsername, role: "GUEST" });
    }
  };

  return (
    <div style={{ backgroundColor: "#0b0f19", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ backgroundColor: "#0f172a", padding: "35px", borderRadius: "16px", width: "100%", maxWidth: "420px", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", textAlign: "center" }}>

        {/* GATEKEEPER LOCK GRAPHIC */}
        <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🔒</div>

        <h2 style={{ margin: "0 0 8px 0", color: "#06b6d4", fontSize: "1.6rem", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}>
          Gatekeeper Login
        </h2>
        <p style={{ margin: "0 0 24px 0", color: "#64748b", fontSize: "0.85rem" }}>
          Log in as Admin or enter any name to instantly book tickets.
        </p>

        {/* ERROR BOX */}
        {errorMessage && (
          <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.25)", color: "#ef4444", padding: "10px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* USERNAME INPUT */}
          <div style={{ textAlign: "left" }}>
            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Username / Name</label>
            <input
              type="text"
              placeholder="admin or your guest name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.9rem", boxSizing: "border-box" }}
            />
          </div>

          {/* PASSWORD INPUT */}
          <div style={{ textAlign: "left" }}>
            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", display: "block", marginBottom: "6px" }}>Password (Only required for admin)</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "#090d16", border: "1px solid rgba(255,255,255,0.08)", color: "white", outline: "none", fontSize: "0.9rem", boxSizing: "border-box" }}
            />
          </div>

          {/* ATTRACTIVE SHOW PASSWORD TOGGLE */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "8px", marginTop: "-4px" }}>
            <input
              type="checkbox"
              id="toggle-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              style={{ width: "15px", height: "15px", cursor: "pointer", accentColor: "#06b6d4" }}
            />
            <label htmlFor="toggle-password" style={{ color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer", userSelect: "none" }}>
              Show Password
            </label>
          </div>

          {/* AUTHENTICATION SUBMIT BUTTON */}
          <button
            type="submit"
            style={{ width: "100%", background: "linear-gradient(135deg, #06b6d4, #0284c7)", color: "white", padding: "12px", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem", marginTop: "4px", boxShadow: "0 4px 15px rgba(6, 182, 212, 0.2)" }}
          >
            Authenticate Account
          </button>
        </form>

        {/* CANCEL VIEW ACTION */}
        <button
          onClick={onCancel}
          style={{ background: "none", border: "none", color: "#64748b", fontSize: "0.8rem", marginTop: "18px", cursor: "pointer", fontWeight: "600" }}
        >
          Cancel & Return
        </button>
      </div>
    </div>
  );
};

export default LoginPage;