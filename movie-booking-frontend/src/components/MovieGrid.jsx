import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onBookClick, onRemoveClick }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
      gap: "25px",
      justifyContent: "center",
      width: "100%"
    }}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onBookClick={onBookClick}
          onRemoveClick={onRemoveClick}
        />
      ))}
    </div>
  );
};

export default MovieGrid;