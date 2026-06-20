// src/pages/BookingSummary.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function BookingSummary() {
  const location = useLocation();
  const { showId = 'N/A', seats = [], totalCost = 0, paymentStatus = 'SUCCESSFUL' } = location.state || {};

  return (
    <div style={{ backgroundColor: '#060a12', color: '#fff', minHeight: '90vh', padding: '4rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
          .stark-font { font-family: 'Orbitron', sans-serif !important; }
        `}
      </style>

      <div style={{ background: 'rgba(8, 14, 27, 0.85)', border: '2px solid #00d4ff', padding: '3rem', borderRadius: '16px', maxWidth: '500px', width: '100%', boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem' }}>💳</span>
        
        {/* Swapped header parameters */}
        <h1 className="stark-font" style={{ fontSize: '1.6rem', fontWeight: '900', color: '#fff', margin: '1rem 0', letterSpacing: '1px' }}>
          PAYMENT VERIFIED
        </h1>
        
        <p className="stark-font" style={{ color: '#00d4ff', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '2.5rem' }}>
          RECEIPT STATUS: // {paymentStatus}
        </p>

        <div style={{ textAlign: 'left', borderTop: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem 0', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="stark-font" style={{ color: '#94a3b8', fontSize: '0.8rem' }}>VECTOR ID:</span>
            <span className="stark-font" style={{ fontWeight: '700' }}>SHOWTIME_{showId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="stark-font" style={{ color: '#94a3b8', fontSize: '0.8rem' }}>SECURED SEATS:</span>
            <span className="stark-font" style={{ fontWeight: '700', color: '#ff003c' }}>{seats.join(', ') || 'None'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="stark-font" style={{ color: '#94a3b8', fontSize: '0.8rem' }}>TOTAL PAID:</span>
            <span className="stark-font" style={{ fontWeight: '900', color: '#00d4ff' }}>${totalCost.toFixed(2)}</span>
          </div>
        </div>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="stark-font" style={{ background: 'transparent', border: '1px solid #00d4ff', color: '#00d4ff', padding: '0.75rem 2rem', borderRadius: '6px', width: '100%', cursor: 'pointer', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Return to HQ Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}