package org.example.moviebookingbackend.controller;

import org.example.moviebookingbackend.model.Movie;
import org.example.moviebookingbackend.model.Booking;
import org.example.moviebookingbackend.repository.MovieRepository;
import org.example.moviebookingbackend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // 1. Get all movies from the database
    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    // 2. Add a new movie to the database
    @PostMapping("/api/movies")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    // 3. Delete an entire movie by its ID
    @DeleteMapping("/api/movies/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
    }

    // 4. Get all reserved seat numbers for a specific movie layout page
    @GetMapping("/api/movies/{id}/seats")
    public List<String> getReservedSeats(@PathVariable Long id) {
        return bookingRepository.findByMovieId(id)
                .stream()
                .map(Booking::getSeatNumber)
                .collect(Collectors.toList());
    }

    // 5. Book multiple specific seat numbers at once
    @PostMapping("/api/movies/{id}/book-seats")
    public void bookSeats(@PathVariable Long id, @RequestBody Map<String, List<String>> payload) {
        List<String> seatNumbers = payload.get("seatNumbers");

        if (seatNumbers == null || seatNumbers.isEmpty()) {
            throw new RuntimeException("No seats selected!");
        }

        // Check if ANY of the chosen target seats are already taken in the database
        for (String seatNumber : seatNumbers) {
            if (bookingRepository.existsByMovieIdAndSeatNumber(id, seatNumber)) {
                throw new RuntimeException("Seat " + seatNumber + " is already reserved!");
            }
        }

        // Save each selected seat number as an individual row in the bookings table
        for (String seatNumber : seatNumbers) {
            Booking booking = new Booking(id, seatNumber);
            bookingRepository.save(booking);
        }

        // Decrease the total available tickets count by the amount of booked seats
        Movie movie = movieRepository.findById(id).orElseThrow();
        if (movie.getAvailableTickets() >= seatNumbers.size()) {
            movie.setAvailableTickets(movie.getAvailableTickets() - seatNumbers.size());
            movieRepository.save(movie);
        }
    }

    // 6. Get ALL bookings in the entire system to view history
    @GetMapping("/api/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}