import React, { useState } from "react";
import Home from "./pages/Home";
import SeatSelection from "./pages/SeatSelection";
import BookingSummary from "./pages/BookingSummary";
import Login from "./pages/Login";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [user, setUser] = useState(null);

  const showBookPage = (movie) => {
    if (!user) {
      alert("🔒 Authentication required! Please sign in first to book seats.");
      setCurrentPage("login");
      return;
    }
    setSelectedMovie(movie);
    setCurrentPage("book");
  };

  const showHomePage = () => {
    setSelectedMovie(null);
    setCurrentPage("home");
  };

  const showSummaryPage = (bookingData) => {
    setActiveBooking(bookingData);
    setCurrentPage("summary");
  };

  const showLoginPage = () => {
    setCurrentPage("login");
  };

  const handleLoginSuccess = (username) => {
    setUser({ username });
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  return (
    <div style={{ backgroundColor: "#070a13", minHeight: "100vh", color: "#f3f4f6" }}>
      {currentPage === "home" && (
        <Home
          user={user}
          onBookClick={showBookPage}
          onSignInClick={showLoginPage}
          onLogoutClick={handleLogout}
        />
      )}

      {currentPage === "book" && (
        <SeatSelection
          movie={selectedMovie}
          onBackClick={showHomePage}
          onConfirmBooking={showSummaryPage}
        />
      )}

      {currentPage === "summary" && (
        <BookingSummary
          booking={activeBooking}
          user={user}
          onHomeClick={showHomePage}
        />
      )}

      {currentPage === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} onCancel={showHomePage} />
      )}
    </div>
  );
};

export default App;