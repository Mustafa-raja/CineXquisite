package com.movies.api.Entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToOne;

@Embeddable
public class ShowEmbeddable implements Serializable {
    @OneToOne
    private Movies movie;
    @OneToOne
    private Cinemas cinema;


    public ShowEmbeddable() {
    }
    public ShowEmbeddable(Movies movie, Cinemas cinema) {
        this.movie = movie;
        this.cinema = cinema;
    }
    public Movies getMovie() {
        return movie;
    }
    public void setMovie(Movies movie) {
        this.movie = movie;
    }
    public Cinemas getCinema() {
        return cinema;
    }
    public void setCinema(Cinemas cinema) {
        this.cinema = cinema;
    }
    
}
