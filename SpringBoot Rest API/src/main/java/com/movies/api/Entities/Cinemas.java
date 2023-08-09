package com.movies.api.Entities;


import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Cinemas {

    @Id
    @GeneratedValue
    private long id;

    private String name;
    private String latitude;
    private String longitude;

    @OneToMany
    private List<Movies> movies;

    public Cinemas(String name, String latitude, String longitude, List<Movies> movies) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.movies = movies;
    }

    public Cinemas(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public List<Movies> getMovies() {
        return movies;
    }

    public void setMovies(List<Movies> movies) {
        this.movies = movies;
    }
}
