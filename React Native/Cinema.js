import React, { PureComponent } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

class Cinema extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { item } = this.props.route.params;
        const CinemaName = item.name;
        const { navigation } = this.props;
        console.log(item);
        console.log(navigation);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Choose a movie of your choice to book tickets for in {item.name} Cinema
                </Text>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {item.movies.map(movie => (
                        <TouchableOpacity onPress={()=> navigation.navigate('Booking', { CinemaName, movie, navigation })} >
                        <View key={movie.id} style={styles.movieCard}>
                            <Image
                                style={styles.poster}
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                                }}
                            />
                            <Text style={styles.movieTitle}>{movie.name}</Text>
                        </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        padding: 10,
    },
    title: {
        color: "gray",
        fontSize: 18,
        fontWeight: "400",
        marginBottom: 20,
        textAlign: "center"
    },
    scrollViewContent: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    movieCard: {
        width: 150,
        backgroundColor: "#222",
        borderRadius: 10,
        margin: 10,
        overflow: "hidden",
    },
    poster: {
        width: "100%",
        height: 200,
    },
    movieTitle: {
        color: "#fff",
        fontSize: 14,
        padding: 5,
        textAlign: "center",
    },
});

export default Cinema;
