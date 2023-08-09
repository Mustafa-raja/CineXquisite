package com.movies.api.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movies.api.Entities.Cinemas;
import com.movies.api.Entities.Movies;
import com.movies.api.Entities.ShowEmbeddable;
import com.movies.api.Entities.Showtime;
import com.movies.api.Repos.CinemaRepo;
import com.movies.api.Repos.MoviesRepo;
import com.movies.api.Repos.ShowtimeRepo;

@Service
public class CinemaService {
    
    @Autowired
    CinemaRepo cinemaRepo;
    @Autowired
    MoviesRepo moviesRepo;
    @Autowired
    ShowtimeRepo showtimeRepo;
    public List<Cinemas> getAllCinemas() {
        return cinemaRepo.findAll();
    }

    public Cinemas PostCinema (String name, String lattitude, String longitude)
    {
        Cinemas cinemas = new Cinemas();
        cinemas.setName(name);
        cinemas.setLatitude(lattitude);
        cinemas.setLongitude(longitude);
        cinemaRepo.save(cinemas);
        return cinemas;
    }

    public Cinemas  AddMovieToCinema(String name, String CinemaName)
    {
        Movies movies  = moviesRepo.findByName(name);
        Cinemas cinemas = cinemaRepo.findByName(CinemaName);
        List<Movies> moviesList = cinemas.getMovies();
        moviesList.add(movies);
        cinemaRepo.save(cinemas);
        setShowtime(cinemas.getName(), movies.getName());
        return cinemas;
    }

   
    public Showtime setShowtime(String CinemaName, String MovieName)
    {
        Cinemas cinemas = cinemaRepo.findByName(CinemaName);
        Movies movies = moviesRepo.findByName(MovieName);

        ShowEmbeddable showEmbeddable = new ShowEmbeddable();
        showEmbeddable.setCinema(cinemas);
        showEmbeddable.setMovie(movies);
        Showtime showtime = new Showtime(showEmbeddable);
        List<Boolean> seats = new ArrayList<Boolean>();
        for(int i = 0 ; i< 20 ; i++) {
            seats.add(false);
        }
        showtime.setTimes(seats);
        showtimeRepo.save(showtime);
        return showtime;
    }

    public Showtime getShowtime(String CinemaName, String MovieName)
    {
        Cinemas cinemas = cinemaRepo.findByName(CinemaName);
        Movies movies = moviesRepo.findByName(MovieName);
        ShowEmbeddable showEmbeddable = new ShowEmbeddable();
        showEmbeddable.setCinema(cinemas);
        showEmbeddable.setMovie(movies);
        Showtime showtime = showtimeRepo.findById(showEmbeddable).orElse(null);
        return showtime;
    }

    public Showtime setSeats(String CinemaName, String MovieName, int[] seats)
    {
        Cinemas cinemas = cinemaRepo.findByName(CinemaName);
        Movies movies = moviesRepo.findByName(MovieName);
        ShowEmbeddable showEmbeddable = new ShowEmbeddable();
        showEmbeddable.setCinema(cinemas);
        showEmbeddable.setMovie(movies);
        Showtime showtime = showtimeRepo.findById(showEmbeddable).orElse(null);
        List<Boolean> seat = showtime.getTimes();
        for(int i =0 ; i<seats.length ; i++)
        {
            seat.set(seats[i], true);
        }
        showtime.setTimes(seat);
        showtimeRepo.save(showtime);
        return showtime;
    }

}
