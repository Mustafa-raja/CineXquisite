package com.movies.api.Repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movies.api.Entities.Cinemas;


public interface CinemaRepo extends JpaRepository<Cinemas,Long>{
    
    public Cinemas findByName(String name);
}
