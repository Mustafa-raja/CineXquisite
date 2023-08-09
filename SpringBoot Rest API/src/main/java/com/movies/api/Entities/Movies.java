package com.movies.api.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Movies {
    
    @Id
    @GeneratedValue
    private long id ;

    private String name;
    private String poster_path;
    private long TMDBid;

    public Movies(String name, String poster_path, long tMDBid) {
        this.name = name;
        this.poster_path = poster_path;
        TMDBid = tMDBid;
    }

    public Movies()
    {

    }

    public Movies(String name, long tMDBid) {
        this.name = name;
        TMDBid = tMDBid;
    }

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

    public long getTMDBid() {
        return TMDBid;
    }

    public void setTMDBid(long tMDBid) {
        TMDBid = tMDBid;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }
}