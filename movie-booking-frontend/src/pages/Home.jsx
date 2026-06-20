// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockMovies } from '../mockData'; 

/**
 * Main Home Presentation Catalog Component
 * Handles stateful filtering across movie titles and universe group tags.
 */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Categories representing specific story sectors within the catalog
  const categories = ['All', 'Cosmic', 'Tech', 'Mystic', 'Team'];

  /**
   * Filter Sequencing Algorithm
   * Processes runtime strings safely to keep the 12 active file grid from crashing.
   * Compares normalized lowercase values dynamically.
   */
  const filteredMovies = (mockMovies || []).filter(movie => {
    if (!movie) return false;
    
    // Guarding title string checking against missing fields
    const titleStr = movie.title ? String(movie.title).toLowerCase() : '';
    const matchesSearch = titleStr.includes(searchQuery.toLowerCase());
    
    // Guarding metadata category tag strings against null fields
    const movieTag = movie.tag ? String(movie.tag).toLowerCase() : '';
    const matchesTag = selectedTag === 'All' || movieTag === selectedTag.toLowerCase();
      
    return matchesSearch && matchesTag;
  });

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      color: '#fff', 
      backgroundColor: '#060a12', 
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Rajdhani:wght@600;700&display=swap');
          
          .stark-font { 
            font-family: 'Orbitron', sans-serif !important; 
          }
          
          .sub-font {
            font-family: 'Rajdhani', sans-serif !important;
          }

          /* Hover transition logic for theater grid item panels */
          .movie-card-wrapper {
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                        border-color 0.3s ease, 
                        box-shadow 0.3s ease !important;
          }

          .movie-card-wrapper:hover {
            transform: translateY(-6px);
            border-color: #ff003c !important;
            box-shadow: 0 10px 25px rgba(255, 0, 60, 0.3) !important;
          }

          /* Smooth scaling transitions for action buttons */
          .action-btn-glow {
            transition: all 0.25s ease-in-out !important;
          }

          .action-btn-glow:hover {
            background-color: #00d4ff !important;
            color: #060a12 !important;
            box-shadow: 0 0 15px rgba(0, 212, 255, 0.6) !important;
          }

          /* Micro-interaction animation layers for filter pills */
          .pill-btn {
            transition: all 0.2s ease !important;
          }

          .pill-btn:hover {
            box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
            border-color: #00d4ff !important;
          }
        `}
      </style>

      {/* MARVEL STUDIOS BRAND HEADLINE — WITH MOVIE COUNT REMOVED */}
      <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2.5rem' }}>
        <h1 className="stark-font" style={{ fontSize: '3.2rem', margin: 0, fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ backgroundColor: '#ff003c', color: '#fff', padding: '0.1rem 0.9rem', borderRadius: '4px', boxShadow: '0 0 20px rgba(255, 0, 60, 0.4)' }}>
            MARVEL
          </span>
          <span style={{ color: '#fff', fontWeight: '400', letterSpacing: '6px' }}>
            STUDIOS
          </span>
        </h1>
        <p className="stark-font" style={{ color: '#00d4ff', margin: '0.85rem 0 0 0', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '5px', fontWeight: '600' }}>
          CINEMATIC UNIVERSE // MULTIVERSE CATALOG
        </p>
      </div>

      {/* SEARCH INPUT */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <input 
          className="stark-font"
          type="text" 
          placeholder="SEARCH ACTIVE OPERATION FILE..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%', maxWidth: '650px', padding: '1rem 1.5rem', borderRadius: '30px', border: '2px solid #004f77', background: 'rgba(4, 10, 21, 0.8)', color: '#fff', fontSize: '0.95rem', letterSpacing: '1px', outline: 'none', boxShadow: '0 0 15px rgba(0, 212, 255, 0.15)'
          }}
        />
      </div>

      {/* CATEGORIES BUTTON BAR */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '4rem', flexWrap: 'wrap' }}>
        {categories.map((category) => {
          const isActive = selectedTag === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedTag(category)}
              className="stark-font pill-btn"
              style={{
                padding: '0.6rem 1.8rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '800', letterSpacing: '1px', cursor: 'pointer', border: isActive ? '1px solid #ff003c' : '1px solid rgba(0, 212, 255, 0.2)', background: isActive ? '#ff003c' : 'rgba(8, 20, 38, 0.6)', color: '#fff', boxShadow: isActive ? '0 0 15px rgba(255, 0, 60, 0.6)' : 'none', minWidth: '105px', textTransform: 'uppercase'
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* GRID CONFIGURATION DISPLAY PANEL */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem', justifyContent: 'center' }}>
        {filteredMovies.map((movie) => (
          <div 
            key={movie.movie_id || Math.random()} 
            className="movie-card-wrapper"
            style={{ 
              background: 'rgba(8, 14, 27, 0.85)', 
              border: '2px solid rgba(0, 212, 255, 0.2)', 
              borderRadius: '16px', 
              padding: '1.25rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between' 
            }}
          >
            <div>
              {/* Media viewport container displaying customized aspect framing filters */}
              <div style={{ position: 'relative', width: '100%', paddingTop: '100%', marginBottom: '1.25rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 212, 255, 0.3)', background: '#0d1527' }}>
                <img 
                  src={movie.poster || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"} 
                  alt={movie.title || "Marvel Operation"} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"; }}
                />
                <div className="stark-font" style={{ position: 'absolute', top: '10px', left: '10px', background: '#ff003c', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: '900', fontSize: '0.6rem', letterSpacing: '1px' }}>
                  MARVEL
                </div>
                <div className="stark-font" style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(6, 10, 18, 0.85)', color: '#00d4ff', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: '700', fontSize: '0.75rem', border: '1px solid rgba(0, 212, 255, 0.4)' }}>
                  ⭐ {movie.rating || '4.5'}
                </div>
                <div className="stark-font" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(6, 10, 18, 0.95) 60%, transparent 100%)', padding: '2rem 0.75rem 0.75rem 0.75rem', color: '#ff003c', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  🏷️ {movie.offerText || "LEVEL 4 ACCESS"}
                </div>
              </div>

              <h3 className="stark-font" style={{ color: '#fff', margin: '0.5rem 0 0.35rem 0', fontSize: '1.1rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {movie.title || "UNTITLED OPERATION"}
              </h3>
              <p className="sub-font" style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1.5rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                {movie.genre ? movie.genre.split(' / ')[0] : 'Action'} • {movie.duration_minutes || 120} MINS
              </p>
            </div>
            
            <Link to={`/movie/${movie.movie_id}`} style={{ textDecoration: 'none' }}>
              <button className="stark-font action-btn-glow" style={{ 
                backgroundColor: 'transparent', color: '#00d4ff', border: '1px solid #00d4ff', padding: '0.75rem 1.2rem', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase'
              }}>
                SELECT SHOW
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}