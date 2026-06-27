import React, { useState } from "react";

const Login = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("🔓 Access Authorized! Welcome back.");
        onLoginSuccess(username);
      } else {
        setErrorMessage(data.error || "Invalid credential sets.");
      }
    } catch (err) {
      setErrorMessage("Could not contact authentication gateway.");
    }
  };

  return (
    <div style={{ color: "white", padding: "100px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: "420px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#0f172a", padding: "45px 35px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", textAlign: "center" }}>

        <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🔐</div>
        <h2 style={{ color: "#06b6d4", margin: "0 0 10px 0", fontWeight: "800", fontSize: "1.6rem" }}>Gatekeeper Login</h2>
        <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: "30px" }}>Provide credentials to configure context instances</p>

        {errorMessage && (
          <div style={{ backgroundColor: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#f87171", padding: "12px", borderRadius: "10px", marginBottom: "25px", fontSize: "0.85rem", fontWeight: "600" }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username Identity"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "14px 18px", marginBottom: "16px", backgroundColor: "#070a13", border: "1px solid rgba(255,255,255,0.06)", color: "white", borderRadius: "12px", boxSizing: "border-box", outline: "none", fontSize: "0.95rem" }}
          />
          <input
            type="password"
            placeholder="Security Pin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "14px 18px", marginBottom: "30px", backgroundColor: "#070a13", border: "1px solid rgba(255,255,255,0.06)", color: "white", borderRadius: "12px", boxSizing: "border-box", outline: "none", fontSize: "0.95rem" }}
          />

          <button type="submit" style={{ width: "100%", padding: "15px", background: "linear-gradient(135deg, #06b6d4, #0284c7)", color: "white", border: "none", fontWeight: "700", borderRadius: "12px", cursor: "pointer", marginBottom: "15px", fontSize: "1rem", boxShadow: "0 4px 15px rgba(6,182,212,0.3)" }}>
            Authenticate Account
          </button>
        </form>

        <button onClick={onCancel} style={{ color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" }} onMouseEnter={(e)=>e.target.style.color='#9ca3af'} onMouseLeave={(e)=>e.target.style.color='#6b7280'}>Cancel & Return</button>
      </div>
    </div>
  );
};

export default Login;