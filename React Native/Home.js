import React from "react";
import { PureComponent } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            Cinemas: [],
        };
      }
      componentDidMount(){
        this.fetchData();
      }
      fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/rest/v2/api/endpoints/AllCinemas`, {
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
            this.setState({ Cinemas: data });
        } catch (error) {
            console.error(error);
        }
    }

   
    renderCinemaCard = ({ item }) => {
        const { navigation } = this.props;
        // console.log(Cinemas);
        return (
            <View style={[{}]}>
                <TouchableOpacity onPress={() =>  navigation.navigate('Cinema', { item, navigation })}>
                    <View style={styles.cinemaCard}>
                        <Text style={styles.cinemaName}>{item.name}</Text>
                        <Text style={styles.MovieText} >Movies in Theater: </Text>
                        <View style={styles.MovieContainer} >
                            <Image style={styles.MovieCard} source={{ uri: `https://image.tmdb.org/t/p/w400/${item.movies[0].poster_path}` }} />
                            <Image style={styles.MovieCard} source={{ uri: `https://image.tmdb.org/t/p/w400/${item.movies[1].poster_path}` }} />
                            <Image style={styles.MovieCard} source={{ uri: `https://image.tmdb.org/t/p/w400/${item.movies[2].poster_path}` }} />
                        </View>
                        <Text style={styles.theText}>Tap to explore more and book your tickets in {item.name} now!</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    };
    render() {
        const {Cinemas} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.welcomesmallText}>Book the ticket of your favorite movie from all the cinemas around you</Text>


                <FlatList
                    data={Cinemas}
                    renderItem={this.renderCinemaCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 10,
    },
    welcomeText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    welcomesmallText: {
        color: "gray",
        fontSize: 18,
        fontWeight: "400",
        marginBottom: 20,
        textAlign: "center"
    },
    listContainer: {
        flexGrow: 1,
    },
    cinemaCard: {
        backgroundColor: "#111111",
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        borderColor: "#787878",
        width: '80%',
        marginLeft: '10%'
    },
    cinemaName: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    MovieCard: {
        height: 125,
        width: 83,
        paddingLeft: 10,
        borderRadius: 10
    },
    MovieContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    theText: {
        color: "#a2a2a2",
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10
    },
    MovieText: {
        color: "#a2a2a2",
        // fontSize: 300,
        marginBottom: 6,
        padding:3
    }
});

export default Home