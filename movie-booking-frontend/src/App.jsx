// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login'; // Imports the clean login file
import SeatSelection from './pages/SeatSelection';
import BookingSummary from './pages/BookingSummary';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#060a12', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          {/* Main home catalog grid view */}
          <Route path="/" element={<Home />} />
          
          {/* Detailed configuration showtime selection panel */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          
          {/* Replaced the old text placeholder div with your interactive login component */}
          <Route path="/login" element={<Login />} />
          
          {/* Interactive tactical matrix grid seat panel */}
          <Route path="/seats/:showId" element={<SeatSelection />} />
          
          {/* Mission validation final receipt statement display */}
          <Route path="/summary" element={<BookingSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;