import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [availableTickets, setAvailableTickets] = useState('');

  const loadMovies = () => {
    fetch('http://localhost:8080/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error loading:", err));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleBook = (movieId) => {
    fetch(`http://localhost:8080/api/movies/${movieId}/book`, { method: 'POST' })
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      alert("🎉 Ticket booked successfully!");
      loadMovies();
    })
    .catch(() => alert("Booking failed."));
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
      alert("🎬 Movie Added!");
      loadMovies();
      setTitle(''); setGenre(''); setPrice(''); setAvailableTickets('');
    });
  };

  return (
    <div style={{ padding: '40px', background: '#111', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00d2ff', margin: '0' }}>🎬 MOVIE BOOKING SYSTEM</h1>

      <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '10px', marginTop: '20px', border: '1px solid #333' }}>
        <h3 style={{ marginTop: '0', color: '#00d2ff' }}>➕ Add a New Movie to Database</h3>
        <form onSubmit={handleAddMovie} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Movie Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: '#fff' }} />
          <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: '#fff' }} />
          <input type="number" step="0.01" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: '#fff', width: '120px' }} />
          <input type="number" placeholder="Seats" value={availableTickets} onChange={(e) => setAvailableTickets(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#222', color: '#fff', width: '120px' }} />
          <button type="submit" style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Add Movie</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ background: '#222', padding: '20px', borderRadius: '10px', border: '1px solid #333', minWidth: '220px' }}>
            <h2 style={{ color: '#fff', marginTop: '0' }}>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Price: ${movie.price}</p>
            <p style={{ color: '#ffea00', fontWeight: 'bold' }}>Available Seats: {movie.availableTickets}</p>
            <button onClick={() => handleBook(movie.id)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', width: '100%', cursor: 'pointer', fontWeight: 'bold' }}>
              Book Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;