package com.movies.api.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movies.api.Entities.Movies;
import com.movies.api.Repos.MoviesRepo;

@Service
public class MovieService {
    @Autowired
    MoviesRepo moviesRepo;

    public List<Movies> getAllMovies() {
        return moviesRepo.findAll();
    }
    public Movies postMovie (String name, String poster,  long id)
    {
        Movies movies = new Movies();
        movies.setName(name);
        movies.setTMDBid(id);
        movies.setPoster_path(poster);
        moviesRepo.save(movies);
        return movies;
    }
}
