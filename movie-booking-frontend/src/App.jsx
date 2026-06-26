import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Form states for adding movie
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [availableTickets, setAvailableTickets] = useState('');

  const loadMovies = () => {
    fetch('http://localhost:8080/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error loading movies:", err));
  };

  const loadAllBookings = () => {
    fetch('http://localhost:8080/api/bookings')
      .then((res) => res.json())
      .then((data) => setAllBookings(data))
      .catch((err) => console.error("Error loading bookings:", err));
  };

  useEffect(() => {
    loadMovies();
    loadAllBookings();
  }, []);

  const openSeatSelection = (movie) => {
    setSelectedMovie(movie);
    setChosenSeats([]);

    fetch(`http://localhost:8080/api/movies/${movie.id}/seats`)
      .then((res) => res.json())
      .then((data) => setReservedSeats(data))
      .catch((err) => console.error("Error loading seats:", err));
  };

  const handleSeatClick = (seatId) => {
    if (chosenSeats.includes(seatId)) {
      setChosenSeats(chosenSeats.filter(seat => seat !== seatId));
    } else {
      setChosenSeats([...chosenSeats, seatId]);
    }
  };

  const handleConfirmSeatBooking = () => {
    if (chosenSeats.length === 0) {
      alert("Please click at least one available seat first!");
      return;
    }

    fetch(`http://localhost:8080/api/movies/${selectedMovie.id}/book-seats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatNumbers: chosenSeats })
    })
    .then((res) => {
      if (!res.ok) throw new Error();
      alert(`🎉 Seats ${chosenSeats.join(', ')} successfully confirmed!`);
      setSelectedMovie(null);
      loadMovies();
      loadAllBookings();
    })
    .catch(() => alert("One or more selected seats have already been reserved. Please try again."));
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    const newMovie = { title, genre, price: parseFloat(price), availableTickets: parseInt(availableTickets) };

    fetch('http://localhost:8080/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMovie)
    })
    .then((res) => res.json())
    .then(() => {
      alert("🎬 Movie Added successfully!");
      loadMovies();
      setTitle(''); setGenre(''); setPrice(''); setAvailableTickets('');
    });
  };

  const handleDelete = (movieId) => {
    if (window.confirm("⚠️ Are you sure you want to remove this movie?")) {
      fetch(`http://localhost:8080/api/movies/${movieId}`, { method: 'DELETE' })
      .then(() => {
        alert("🗑️ Movie deleted.");
        loadMovies();
        loadAllBookings();
      });
    }
  };

  const seatRows = ['A', 'B', 'C', 'D'];
  const seatNumbers = [1, 2, 3, 4, 5, 6];

  const getMovieTitleById = (id) => {
    const found = movies.find(m => m.id === id);
    return found ? found.title : `Movie ID: ${id}`;
  };

  // ================= VIEW: SEAT SELECTION INTERFACE =================
  if (selectedMovie) {
    return (
      <div style={{ padding: '40px', background: 'radial-gradient(circle at top, #1e1b4b 0%, #09090b 100%)', color: '#fff', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, sans-serif', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
          <button onClick={() => setSelectedMovie(null)} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', backdropFilter: 'blur(10px)', transition: '0.3s' }}>⬅ Back to Catalog</button>
        </div>

        <h2 style={{ color: '#06b6d4', marginTop: '40px', fontSize: '2rem', letterSpacing: '1px' }}>🎬 SEAT RESERVATION FOR: {selectedMovie.title.toUpperCase()}</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Genre: <span style={{ color: '#fff' }}>{selectedMovie.genre}</span> | Ticket Rate: <span style={{ color: '#eab308', fontWeight: 'bold' }}>${selectedMovie.price}</span></p>

        {/* CINEMA SCREEN EFFECT */}
        <div style={{ width: '80%', maxWidth: '600px', height: '6px', background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)', margin: '50px auto 10px auto', borderRadius: '4px', boxShadow: '0 0 20px #06b6d4' }}></div>
        <p style={{ fontSize: '12px', color: '#64748b', letterSpacing: '6px', marginBottom: '50px', textTransform: 'uppercase' }}>DIGITAL CINEMA SCREEN</p>

        {/* SWIGGY DINETTE SEAT MAP GRID */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', margin: '20px auto', background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '500px' }}>
          {seatRows.map((row) => (
            <div key={row} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ width: '24px', fontWeight: '700', color: '#475569', fontSize: '1.1rem' }}>{row}</span>
              {seatNumbers.map((num) => {
                const currentSeatId = `${row}${num}`;
                const isTaken = reservedSeats.includes(currentSeatId);
                const isCurrentlySelected = chosenSeats.includes(currentSeatId);

                let seatBackground = '#1e293b';
                if (isTaken) seatBackground = '#ef4444';
                if (isCurrentlySelected) seatBackground = '#10b981';

                return (
                  <button
                    key={currentSeatId}
                    disabled={isTaken}
                    onClick={() => handleSeatClick(currentSeatId)}
                    style={{
                      width: '46px',
                      height: '44px',
                      background: seatBackground,
                      color: '#fff',
                      border: isCurrentlySelected ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      cursor: isTaken ? 'not-allowed' : 'pointer',
                      fontWeight: '700',
                      fontSize: '13px',
                      boxShadow: isCurrentlySelected ? '0 0 15px #10b981' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* LEGEND COLOR MAP MAP GUIDE */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '30px 0', fontSize: '14px', color: '#94a3b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ display: 'inline-block', width: '16px', height: '16px', background: '#1e293b', borderRadius: '4px' }}></span> Available</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ display: 'inline-block', width: '16px', height: '16px', background: '#ef4444', borderRadius: '4px' }}></span> Reserved</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ display: 'inline-block', width: '16px', height: '16px', background: '#10b981', borderRadius: '4px' }}></span> Selected ({chosenSeats.length})</div>
        </div>

        {/* SELECTED TOTAL DETAILS SUMMARY PANEL */}
        {chosenSeats.length > 0 && (
          <div style={{ margin: '30px auto', background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1))', padding: '20px', borderRadius: '16px', maxWidth: '400px', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#cbd5e1' }}>Selected Seats: <strong style={{ color: '#10b981', fontSize: '1.2rem', letterSpacing: '1px' }}>{chosenSeats.join(', ')}</strong></p>
            <p style={{ margin: '0', fontSize: '1rem', color: '#cbd5e1' }}>Total Summary Price: <strong style={{ color: '#eab308', fontSize: '1.4rem' }}>${(chosenSeats.length * selectedMovie.price).toFixed(2)}</strong></p>
          </div>
        )}

        <button
          onClick={handleConfirmSeatBooking}
          style={{ background: 'linear-gradient(90deg, #0284c7, #0369a1)', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', fontSize: '16px', boxShadow: '0 4px 20px rgba(2,132,199,0.4)', marginTop: '10px', transition: '0.3s' }}
        >
          Confirm Ticket Booking
        </button>
      </div>
    );
  }

  // ================= VIEW: MAIN DASHBOARD LAYOUT =================
  return (
    <div style={{ padding: '0 0 60px 0', background: '#09090b', color: '#f4f4f5', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, system-ui, sans-serif' }}>

      {/* GLOWING HEADER NAVIGATION BAR */}
      <div style={{ background: 'rgba(15,15,20,0.7)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px', backdropFilter: 'blur(12px)', position: 'sticky', top: '0', zIndex: '100', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🎬</span>
          <h1 style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0', fontSize: '1.6rem', fontWeight: '800', letterSpacing: '1px' }}>STARKHQ CINEMAS</h1>
        </div>
        <button
          onClick={() => { setShowHistory(!showHistory); loadAllBookings(); }}
          style={{ background: showHistory ? 'linear-gradient(90deg, #3b82f6, #2563eb)' : 'linear-gradient(90deg, #ca8a04, #eab308)', color: showHistory ? '#fff' : '#000', border: 'none', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: '0.3s ease' }}
        >
          {showHistory ? "👁️ Show Movie Catalog" : "📜 View Database Booking Logs"}
        </button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* POLISHED DATABASE MANAGEMENT INPUT PANELS */}
        <div style={{ background: 'linear-gradient(145deg, #18181b, #09090b)', padding: '30px', borderRadius: '16px', marginTop: '40px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <h3 style={{ marginTop: '0', color: '#06b6d4', fontSize: '1.2rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>➕ Add a New Movie to Database</h3>
          <form onSubmit={handleAddMovie} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: '1', minWidth: '200px', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: '#18181b', color: '#fff', fontSize: '14px' }} />
            <input type="text" placeholder="Genre (e.g. Action)" value={genre} onChange={(e) => setGenre(e.target.value)} required style={{ flex: '1', minWidth: '150px', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: '#18181b', color: '#fff', fontSize: '14px' }} />
            <input type="number" step="0.01" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: '110px', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: '#18181b', color: '#fff', fontSize: '14px' }} />
            <input type="number" placeholder="Seats" value={availableTickets} onChange={(e) => setAvailableTickets(e.target.value)} required style={{ width: '110px', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: '#18181b', color: '#fff', fontSize: '14px' }} />
            <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '14px 30px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 15px rgba(16,185,129,0.3)', transition: '0.2s' }}>Add Movie</button>
          </form>
        </div>

        {showHistory ? (

          /* REAL-TIME LOGS MONITOR LAYOUT VIEW */
          <div style={{ marginTop: '40px', background: '#18181b', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: '#eab308', marginTop: '0', fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px' }}>📜 REAL-TIME DATABASE BOOKING LOGS</h2>
            {allBookings.length === 0 ? (
              <p style={{ color: '#a1a1aa', padding: '20px 0' }}>No active bookings found inside the database.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.08)', color: '#a1a1aa' }}>
                      <th style={{ padding: '16px' }}>Booking ID</th>
                      <th style={{ padding: '16px' }}>Movie Title</th>
                      <th style={{ padding: '16px' }}>Reserved Seat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
                        <td style={{ padding: '16px', fontWeight: '700', color: '#06b6d4' }}>#{b.id}</td>
                        <td style={{ padding: '16px', fontWeight: '600' }}>{getMovieTitleById(b.movieId)}</td>
                        <td style={{ padding: '16px' }}><span style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(16,185,129,0.3)' }}>{b.seatNumber}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        ) : (

          /* DYNAMIC CINEMATIC DASHBOARD CATALOG CARDS VIEW */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {movies.map((movie) => (
              <div key={movie.id} style={{ background: '#18181b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', transition: 'transform 0.3s ease' }}>

                {/* CARD DECORATIVE IMAGE PLACEHOLDER BADGE */}
                <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #311042)', padding: '30px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.03)', position: 'relative' }}>
                  <span style={{ fontSize: '40px' }}>🎬</span>
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', color: '#06b6d4', fontWeight: '700', border: '1px solid rgba(6,182,212,0.3)' }}>{movie.genre}</span>
                </div>

                <div style={{ padding: '24px', flexGrow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ color: '#fff', marginTop: '0', marginBottom: '12px', fontSize: '1.3rem', fontWeight: '700', letterSpacing: '0.5px' }}>{movie.title}</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '14px', color: '#a1a1aa' }}>
                      <span>Price Rate</span>
                      <strong style={{ color: '#eab308', fontSize: '1.2rem' }}>${movie.price}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#a1a1aa', marginBottom: '20px' }}>
                      <span>Available Capacity</span>
                      <strong style={{ color: movie.availableTickets > 0 ? '#10b981' : '#ef4444' }}>{movie.availableTickets} Seats left</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button onClick={() => openSeatSelection(movie)} style={{ background: 'linear-gradient(90deg, #3b82f6, #2563eb)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', width: '100%', cursor: 'pointer', fontWeight: '700', fontSize: '14px', boxShadow: '0 4px 15px rgba(59,130,246,0.2)', transition: '0.2s' }}>
                      Book Ticket
                    </button>
                    <button onClick={() => handleDelete(movie.id)} style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '10px', borderRadius: '10px', width: '100%', cursor: 'pointer', fontWeight: '600', fontSize: '12px', transition: '0.2s' }}>
                      Remove Movie from DB
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;