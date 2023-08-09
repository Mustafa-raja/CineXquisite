package com.movies.api.Repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movies.api.Entities.Movies;

public interface MoviesRepo extends JpaRepository<Movies,Long>{
        public Movies findByName(String name);

}
