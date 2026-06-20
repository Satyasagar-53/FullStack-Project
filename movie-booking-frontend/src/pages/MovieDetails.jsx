// src/pages/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockMovies } from '../mockData';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const foundMovie = (mockMovies || []).find((m) => m.movie_id === parseInt(id));
    setMovie(foundMovie);
  }, [id]);

  if (!movie) {
    return (
      <div style={{ color: '#fff', backgroundColor: '#060a12', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 className="stark-font">LOADING DATALINK ENTRY...</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#060a12', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
          .stark-font { font-family: 'Orbitron', sans-serif !important; }
        `}
      </style>

      <Link to="/" style={{ color: '#00d4ff', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', border: '1px solid #004f77', padding: '0.5rem 1rem', borderRadius: '4px' }} className="stark-font">
        ← Return to Operations Dashboard
      </Link>

      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <div style={{ width: '300px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #00d4ff' }}>
          <img src={movie.poster} alt={movie.title} style={{ width: '100%', display: 'block' }} />
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <span style={{ backgroundColor: '#ff003c', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900' }} className="stark-font">{movie.tag}</span>
          <h1 className="stark-font" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{movie.title}</h1>
          <p style={{ color: '#94a3b8' }}>{movie.genre} • ⭐ {movie.rating}</p>
          <p style={{ margin: '2rem 0', lineHeight: '1.6', color: '#cbd5e1' }}>{movie.synopsis}</p>
          
          <h3 className="stark-font" style={{ color: '#00d4ff', borderBottom: '1px solid #004f77', paddingBottom: '0.5rem' }}>Available Mission Showtimes</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {movie.shows ? movie.shows.map(show => (
              <Link to={`/seats/${show.show_id}`} key={show.show_id} style={{ textDecoration: 'none' }}>
                <button className="stark-font" style={{ background: 'rgba(4, 10, 21, 0.8)', border: '1px solid #00d4ff', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer' }}>
                  {show.time} - ${show.price}
                </button>
              </Link>
            )) : <p style={{ color: '#94a3b8' }}>No schedules generated.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}