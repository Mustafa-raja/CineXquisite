package com.movies.api.Repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movies.api.Entities.ShowEmbeddable;
import com.movies.api.Entities.Showtime;

public interface ShowtimeRepo extends JpaRepository<Showtime, ShowEmbeddable> {
    
}
