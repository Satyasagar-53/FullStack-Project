// src/pages/SeatSelection.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeatSelection() {
  const { showId } = useParams();
  const navigate = useNavigate();
  
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const ticketPrice = 15.00;
  const occupiedSeats = ['A3', 'A4', 'C5', 'C6', 'E1', 'E2'];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  };

  const totalCost = selectedSeats.length * ticketPrice;

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;
    navigate('/summary', {
      state: { showId, seats: selectedSeats, totalCost, paymentStatus: 'SUCCESSFUL' }
    });
  };

  return (
    <div style={{ padding: '3rem 4rem', backgroundColor: '#060a12', minHeight: '92vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
          .stark-font { font-family: 'Orbitron', sans-serif !important; }
          
          /* Animated cinematic project screen arch */
          .cinema-screen {
            width: 100%;
            height: 12px;
            background: linear-gradient(90deg, transparent, #00d4ff, transparent);
            border-radius: 50%;
            filter: drop-shadow(0px 4px 12px rgba(0, 212, 255, 0.8));
            margin-bottom: 0.5rem;
          }

          /* Interactive glowing seat elements */
          .interactive-seat {
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .interactive-seat:hover:not(:disabled) {
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 0 15px #00d4ff;
            border-color: #00d4ff !important;
            color: #060a12 !important;
          }
          
          /* Glowing sidebar status panels */
          .glow-panel {
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.05);
            backdrop-filter: blur(12px);
          }
        `}
      </style>
      
      {/* Dynamic Header */}
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <button onClick={() => navigate(-1)} className="stark-font" style={{ background: 'transparent', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff', padding: '0.6rem 1.4rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = 'rgba(0, 212, 255, 0.1)'} onMouseLeave={(e) => e.target.style.background = 'transparent'}>
          ← BACK TO DOSSIER
        </button>
        <span className="stark-font" style={{ color: '#00d4ff', fontSize: '0.8rem', letterSpacing: '2px', border: '1px solid rgba(0, 212, 255, 0.15)', padding: '0.4rem 1rem', borderRadius: '20px', background: 'rgba(0, 79, 119, 0.15)' }}>
          SYSTEM_NODE // CORE_{showId}
        </span>
      </div>

      {/* Main Container Core Section */}
      <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Left Side: Seat Matrix Grid Card Layout */}
        <div style={{ flex: '1 1 650px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Animated Projection Area */}
          <div style={{ width: '100%', maxWidth: '550px', textAlign: 'center', marginBottom: '4rem' }}>
            <div className="cinema-screen" />
            <p className="stark-font" style={{ fontSize: '0.65rem', color: 'rgba(0, 212, 255, 0.4)', letterSpacing: '8px', margin: 0, fontWeight: '900' }}>
              PRIMARY VECTOR CINEMA SCREEN
            </p>
          </div>

          {/* Seating Grid Wrapper Layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', background: 'rgba(8, 14, 27, 0.6)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(0, 212, 255, 0.1)', width: '100%', alignItems: 'center' }}>
            {rows.map(row => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <span className="stark-font" style={{ width: '24px', color: '#004f77', fontWeight: '900', fontSize: '1.1rem', textAlign: 'center' }}>{row}</span>
                <div style={{ display: 'flex', gap: '0.9rem' }}>
                  {seatNumbers.map(num => {
                    const id = `${row}${num}`;
                    const isOccupied = occupiedSeats.includes(id);
                    const isSelected = selectedSeats.includes(id);
                    
                    return (
                      <button
                        key={id} 
                        disabled={isOccupied} 
                        onClick={() => handleSeatClick(id)}
                        className="interactive-seat"
                        style={{
                          width: '40px', height: '40px', borderRadius: '10px', cursor: isOccupied ? 'not-allowed' : 'pointer',
                          background: isOccupied ? 'linear-gradient(135deg, #220511, #ff003c22)' : isSelected ? '#00d4ff' : 'rgba(4, 10, 21, 0.9)',
                          border: isOccupied ? '1px solid #ff003c' : isSelected ? '1px solid #00d4ff' : '1px solid rgba(0, 79, 119, 0.6)',
                          color: isSelected ? '#060a12' : isOccupied ? '#ff003c' : '#94a3b8', 
                          fontWeight: '800', fontSize: '0.8rem',
                          boxShadow: isSelected ? '0 0 15px rgba(0, 212, 255, 0.4)' : 'none'
                        }}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Informational Legend Badges */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '16px', height: '16px', background: 'rgba(4, 10, 21, 0.9)', border: '1px solid rgba(0, 79, 119, 0.6)', borderRadius: '4px' }} />
              <span className="stark-font" style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '1px' }}>AVAILABLE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '16px', height: '16px', background: '#00d4ff', borderRadius: '4px', boxShadow: '0 0 8px #00d4ff' }} />
              <span className="stark-font" style={{ fontSize: '0.7rem', color: '#00d4ff', letterSpacing: '1px' }}>SELECTED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '16px', height: '16px', background: '#ff003c22', border: '1px solid #ff003c', borderRadius: '4px' }} />
              <span className="stark-font" style={{ fontSize: '0.7rem', color: '#ff003c', letterSpacing: '1px' }}>RESERVED</span>
            </div>
          </div>

        </div>

        {/* Right Side: Premium High-Tech Checkout Terminal */}
        <div className="glow-panel" style={{ flex: '1 1 380px', background: 'linear-gradient(145deg, rgba(8, 14, 27, 0.9), rgba(4, 8, 16, 0.95))', border: '2px solid rgba(0, 212, 255, 0.15)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto', alignSelf: 'stretch' }}>
          <div>
            <h3 className="stark-font" style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem', fontWeight: '900', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
              MANIFEST OVERVIEW
            </h3>

            {/* Coordinates Parameter Row */}
            <div style={{ marginBottom: '2rem' }}>
              <p className="stark-font" style={{ margin: '0 0 0.5rem 0', fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '1px' }}>SELECTED NODES</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedSeats.length > 0 ? selectedSeats.map(seat => (
                  <span key={seat} className="stark-font" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid #00d4ff', padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#00d4ff', fontWeight: '700' }}>
                    {seat}
                  </span>
                )) : (
                  <span className="stark-font" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', fontStyle: 'italic' }}>No nodes designated...</span>
                )}
              </div>
            </div>

            {/* System Breakdown Computation List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stark-font" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Unit Fare</span>
                <span className="stark-font" style={{ fontSize: '0.85rem' }}>${ticketPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="stark-font" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quantity</span>
                <span className="stark-font" style={{ fontSize: '0.85rem' }}>x{selectedSeats.length}</span>
              </div>
            </div>
          </div>

          {/* Grand Valuation Calculation & CTA Button */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', padding: '0 0.5rem' }}>
              <span className="stark-font" style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700' }}>TOTAL COST</span>
              <span className="stark-font" style={{ fontSize: '2rem', color: '#00d4ff', fontWeight: '900', textShadow: '0 0 15px rgba(0, 212, 255, 0.4)' }}>
                ${totalCost.toFixed(2)}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={handleProceedToPayment}
              className="stark-font"
              style={{
                width: '100%',
                background: selectedSeats.length === 0 ? 'transparent' : 'linear-gradient(135deg, #ff003c, #b30027)',
                border: selectedSeats.length === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                color: selectedSeats.length === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
                padding: '1.2rem',
                borderRadius: '12px',
                cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
                fontWeight: '900',
                fontSize: '0.9rem',
                letterSpacing: '2px',
                boxShadow: selectedSeats.length === 0 ? 'none' : '0 8px 25px rgba(255, 0, 60, 0.35)',
                transition: 'all 0.25s ease',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => { if(selectedSeats.length > 0) e.target.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { if(selectedSeats.length > 0) e.target.style.transform = 'translateY(0)' }}
            >
              PROCEED TO PAY
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}