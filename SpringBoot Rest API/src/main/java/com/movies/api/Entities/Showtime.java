package com.movies.api.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;


@Entity
public class Showtime {
    @EmbeddedId
    private ShowEmbeddable id;
    private List<Boolean> times = new ArrayList<Boolean>(20);


    public Showtime(){}


    public Showtime(ShowEmbeddable id) {
        this.id = id;
    }
    public Showtime(ShowEmbeddable id, List<Boolean> times) {
        this.id = id;
        this.times = times;
    }
    public ShowEmbeddable getId() {
        return id;
    }
    public void setId(ShowEmbeddable id) {
        this.id = id;
    }
    public List<Boolean> getTimes() {
        return times;
    }
    public void setTimes(List<Boolean> times) {
        this.times = times;
    } 




    
}
