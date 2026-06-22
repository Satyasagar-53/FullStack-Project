package org.example.moviebookingbackend.repository;

import org.example.moviebookingbackend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // JpaRepository automatically handles basic database tasks (Save, Find, Delete) for us!
}