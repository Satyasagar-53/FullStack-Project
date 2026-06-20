// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.2rem 4rem', 
      backgroundColor: '#060a12', 
      borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
      fontFamily: "'Orbitron', sans-serif"
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        `}
      </style>
      
      {/* Left Logo Side — Updated to Movie Icon and CINEMAX */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <span style={{ fontSize: '1.5rem', textShadow: '0 0 10px #ff003c' }}>🎬</span>
        <h2 style={{ margin: 0, letterSpacing: '2px', fontSize: '1.4rem', fontWeight: '900', color: '#fff' }}>
          CINE<span style={{ color: '#ff003c' }}>MAX</span>
        </h2>
      </Link>

      {/* Right Navigation Corner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Changed from 'Missions' to 'Home' */}
        <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '1px', fontWeight: '600' }}>
          Home
        </Link>
        
        {/* Changed button text from 'Access Terminal' to 'Login' */}
        <Link to="/login" style={{ 
          color: '#00d4ff', 
          textDecoration: 'none', 
          fontSize: '0.85rem', 
          letterSpacing: '1px', 
          fontWeight: '700',
          border: '1px solid #00d4ff',
          padding: '0.5rem 1.2rem',
          borderRadius: '6px',
          boxShadow: '0 0 10px rgba(0,212,255,0.2)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(0,212,255,0.1)'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}