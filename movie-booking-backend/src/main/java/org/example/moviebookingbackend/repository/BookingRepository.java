package org.example.moviebookingbackend.repository;

import org.example.moviebookingbackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByMovieId(Long movieId);
    boolean existsByMovieIdAndSeatNumber(Long movieId, String seatNumber);
}