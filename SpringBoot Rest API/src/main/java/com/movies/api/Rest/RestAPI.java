package com.movies.api.Rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movies.api.Entities.Cinemas;
import com.movies.api.Entities.Movies;
import com.movies.api.Entities.Showtime;
import com.movies.api.Service.CinemaService;
import com.movies.api.Service.MovieService;

@RestController
@RequestMapping("/rest/v2/api/endpoints")
public class RestAPI {

    @Autowired
    MovieService movieService;
    @Autowired
    CinemaService cinemaService;

    @GetMapping("/AllMovies")
    public List<Movies> getAllMovies(){
        return movieService.getAllMovies();
    }
    @GetMapping("/AllCinemas")
    public List<Cinemas> getAllCinemas(){
        return cinemaService.getAllCinemas();
    }
    @PostMapping("/PostMovie")
    public Movies PostMovie(@RequestParam String name, @RequestParam String poster, @RequestParam long id)
    {
        return movieService.postMovie(name,poster,  id);
    }
    @PostMapping("/PostCinema")
    public Cinemas PostCinema(@RequestParam String name, @RequestParam String longitude, @RequestParam String latitude){
        return cinemaService.PostCinema(name, latitude, longitude);
    }
    @PostMapping("/AddMovieToCinema")
    public Cinemas AddMovieToCinema(@RequestParam String name,  @RequestParam String CinemaName)
    {
        return cinemaService.AddMovieToCinema(name, CinemaName);
    }
    @PostMapping("/AssociatingShowtimes")
    public Showtime addShowtime (@RequestParam String CinemaName, @RequestParam String MovieName)
    {
        return cinemaService.setShowtime(CinemaName, MovieName);
    }
    @GetMapping("/GetShowtimes")
    public Showtime getShowtime (@RequestParam String CinemaName, @RequestParam String MovieName)
    {
        return cinemaService.getShowtime(CinemaName, MovieName);
    }
    @PostMapping("/SetSeats")
    public Showtime setSeats (@RequestParam String CinemaName, @RequestParam String MovieName, @RequestParam int[] seats)
    {
        return cinemaService.setSeats(CinemaName, MovieName, seats);
    }
}
