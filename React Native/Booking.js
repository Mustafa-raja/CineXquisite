import { PureComponent } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
class Booking extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            Shows: "",
            theMovie: "",
            selectedSeats: [],
        }
    }
    componentDidMount() {
        this.fetchData()
        this.fetchMovie()
    }
    fetchData = async () => {
        const { CinemaName, movie } = this.props.route.params;
        try {
            const response = await fetch(`http://localhost:8080/rest/v2/api/endpoints/GetShowtimes?CinemaName=${CinemaName}&MovieName=${movie.name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            this.setState({ Shows: data });
        } catch (error) {
            console.error(error);
        }
    }
    fetchMovie = async () => {
        const { movie } = this.props.route.params;
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbid}?language=en-US`, {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            this.setState({ theMovie: data });
        } catch (error) {
            console.error(error);
        }
    }
    handleSeatSelection = (index) => {
        const { selectedSeats, Shows } = this.state;
        const isSeatTaken = Shows.times[index];

        if (isSeatTaken) {
            return; // If the seat is taken (white), do not allow selection
        }

        if (selectedSeats.includes(index)) {
            this.setState({
                selectedSeats: selectedSeats.filter(seatIndex => seatIndex !== index),
            });
        } else if (selectedSeats.length < 3) {
            this.setState({
                selectedSeats: [...selectedSeats, index],
            });
        }
    }

    handleBuy = async () => {
        const { CinemaName, movie } = this.props.route.params;
        const { selectedSeats } = this.state;
        if (selectedSeats.length == 3) {
            try {
                const response = await fetch(`http://localhost:8080/rest/v2/api/endpoints/SetSeats?CinemaName=${CinemaName}&MovieName=${movie.name}&seats=${selectedSeats[0]}&seats=${selectedSeats[1]}&seats=${selectedSeats[2]}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                this.setState({ Shows: data });
            } catch (error) {
                console.error(error);
            }
        }
        else if (selectedSeats.length == 2)
        {
            try {
                const response = await fetch(`http://localhost:8080/rest/v2/api/endpoints/SetSeats?CinemaName=${CinemaName}&MovieName=${movie.name}&seats=${selectedSeats[0]}&seats=${selectedSeats[1]}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                this.setState({ Shows: data });
            } catch (error) {
                console.error(error);
            }
        }
        else if (selectedSeats.length == 1)
        {
            try {
                const response = await fetch(`http://localhost:8080/rest/v2/api/endpoints/SetSeats?CinemaName=${CinemaName}&MovieName=${movie.name}&seats=${selectedSeats[0]}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                this.setState({ Shows: data });
            } catch (error) {
                console.error(error);
            }
        }
        else{
            console.log(selectedSeats) 
        }
        this.setState({selectedSeats : []})
        this.fetchData()
    }

    render() {
        const { Shows, theMovie, selectedSeats } = this.state;
        const { movie, CinemaName } = this.props.route.params;

        console.log(theMovie.backdrop_path)
        if (!Shows) {
            return (
                <View style={styles.container}>
                    <Text style={{ color: '#fff' }}>Loading...</Text>
                </View>
            );
        }

        const imageComponent = theMovie.backdrop_path ? (
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/original/${theMovie.backdrop_path}?${Date.now()}` }}
                style={styles.backdrop}
            />

        ) : null;

        const availableSeats = Shows.times.map((time, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => this.handleSeatSelection(index)} // Handle seat selection
                style={[
                    styles.seat,
                    {
                        backgroundColor: selectedSeats.includes(index)
                            ? '#820000' // Change color for selected seats
                            : time
                                ? 'white'
                                : 'gray',
                    },
                ]}
            />
        ));

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Book from the available seats for {movie.name} in {CinemaName}
                </Text>
                <View>
                    {imageComponent}
                </View>
                <View style={styles.overflow} >
                    <View style={styles.screen} />
                </View>
                <View style={styles.seatContainer}>
                    {availableSeats}
                </View>
                <TouchableOpacity style={styles.Button} onPress={() => { this.handleBuy() }}>
                    <Text style={styles.ButtonText}>Buy Tickets</Text>
                    <Text style={styles.ButtonText}>$0</Text>
                </TouchableOpacity>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
    },
    Button: {
        marginTop: 45,
        width: "90%",
        height: 50,
        backgroundColor: "#820000",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    ButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    },
    title: {
        color: "gray",
        fontSize: 18,
        fontWeight: "400",
        marginBottom: 20,
        textAlign: "center"
    },
    seatContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        justifyContent: "center"
    },
    overflow: {
        overflow: 'hidden',
        width: "90%",
        alignItems: 'center',
        height: 100,
    },
    absoluteContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    backdrop: {
        width: 400,
        height: 250,
        borderRadius: 10
    },
    seat: {
        width: 35,
        height: 50,
        margin: 7,
        borderRadius: 7,
    },
    screen: {
        marginTop: 20,
        width: 1000,
        borderWidth: 5,
        borderRadius: 1000,
        height: 1000,
        borderBottomWidth: 0.25,
        borderRightWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: '#820000',
        backgroundColor: 'transparent',
    },
});
export default Booking;