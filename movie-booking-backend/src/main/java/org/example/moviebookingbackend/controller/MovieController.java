package org.example.moviebookingbackend.controller;

import org.example.moviebookingbackend.model.Movie;
import org.example.moviebookingbackend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    // 1. Get all movies
    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    // 2. Book a ticket
    @PostMapping("/api/movies/{id}/book")
    public Movie bookMovie(@PathVariable Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        if (movie.getAvailableTickets() > 0) {
            movie.setAvailableTickets(movie.getAvailableTickets() - 1);
            return movieRepository.save(movie);
        } else {
            throw new RuntimeException("No tickets available!");
        }
    }

    // 3. Add a brand new movie
    @PostMapping("/api/movies")
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }
}