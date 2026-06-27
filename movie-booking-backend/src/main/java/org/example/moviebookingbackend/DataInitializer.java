package org.example.moviebookingbackend;

import org.example.moviebookingbackend.model.Movie;
import org.example.moviebookingbackend.model.User;
import org.example.moviebookingbackend.repository.MovieRepository;
import org.example.moviebookingbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. AUTOMATICALLY RESTORE THE MOVIES IF EMPTY
        if (movieRepository.count() == 0) {
            System.out.println("🎬 Database is empty! Auto-populating movie catalog records...");

            Movie m1 = new Movie();
            m1.setTitle("Inception");
            m1.setGenre("Sci-Fi");
            m1.setPrice(12.5);
            m1.setAvailableTickets(39);
            movieRepository.save(m1);

            Movie m2 = new Movie();
            m2.setTitle("The Dark Knight");
            m2.setGenre("Action");
            m2.setPrice(15.0);
            m2.setAvailableTickets(30);
            movieRepository.save(m2);

            Movie m3 = new Movie();
            m3.setTitle("Interstellar");
            m3.setGenre("Sci-Fi");
            m3.setPrice(14.0);
            m3.setAvailableTickets(42);
            movieRepository.save(m3);

            Movie m4 = new Movie();
            m4.setTitle("Avatar");
            m4.setGenre("Action");
            m4.setPrice(100.0);
            m4.setAvailableTickets(50);
            movieRepository.save(m4);
        }

        // 2. AUTOMATICALLY RESTORE USER CHIKU IF EMPTY
        if (userRepository.findByUsername("chiku").isEmpty()) {
            System.out.println("👤 Restoring user 'chiku' credentials to the database...");
            User chiku = new User();
            chiku.setUsername("chiku");
            chiku.setPassword("1234");
            chiku.setEmail("chiku@1234");
            userRepository.save(chiku);
        }
    }
}