import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,FlatList, TouchableOpacity, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

class DetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            Data: null,
            Actors: null,
            Crew: null,
            Rent: null,
            Buy: null,
            Similar: null,
            Trailer: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const { item } = this.props.route.params;
        console.log(item);
        let url2 = `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`;
        try {
            const response = await fetch(url2, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
                },
            });
            const json = await response.json();
            this.setState({ Data: json });
        } catch (error) {
            this.setState({ Data: null });
            console.error('Error:', error);
        }
        let url3 = `https://api.themoviedb.org/3/movie/${item.id}/credits?language=en-US`;
        try {
            const response = await fetch(url3, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
                },
            });
            const json = await response.json();
            const actors = json.cast.slice(0, 15); // Limit the array to 15 items

            this.setState({ Actors: actors, Crew: json.crew });
        } catch (error) {
            this.setState({ Actors: null });
            console.error('Error:', error);
        }
        let url5 = `https://api.themoviedb.org/3/movie/${item.id}/similar?language=en-US&page=1`;
        try {
            const response = await fetch(url5, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
                },
            });
            const json = await response.json();
            const filteredAndSortedMovies = json.results
  .filter(movie => movie.release_date >= '2000-01-01')
  .sort((a, b) => b.popularity - a.popularity);


            this.setState({ Similar: filteredAndSortedMovies });
        } catch (error) {
            this.setState({ Similar: null });
            console.error('Error:', error);
        }

        let url6 = `https://api.themoviedb.org/3/movie/${item.id}/videos?language=en-US`;
    try {
      const response = await fetch(url6, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
        },
      });
      const json = await response.json();
      console.log(json)
      const officialTrailer = json.results.find(result => result.name === "Official Trailer");
      if (officialTrailer) {
        this.setState({ Trailer: officialTrailer.key });
      } else {
        // If no "Official Trailer" is found, you can handle this case accordingly
        this.setState({ Trailer: json.results[0].key });
        console.log("No official trailer found");
      }

      // console.log(this.state.data);
    } catch (error) {
      // console.error('Error:', error);
      this.setState({ isLoading: false });
    }



    };

    renderSimilarMovie = ({ item }) => {
        const { navigation  } = this.props.route.params;
        return (
            <View style={styles.similarCard}>
                <TouchableOpacity onPress={() => navigation.push('Details', { item, navigation })}>
                    <Image style={styles.similarImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
                </TouchableOpacity>
            </View>
        );
    };

    renderCrew = ({ item }) => (
        <View style={styles.crewCard}>
            <Image style={styles.crewImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }} />
            <Text style={styles.crewName}>{item.name}</Text>
            <Text style={styles.crewJob}>{item.job}</Text>
        </View>
    );

    render() {
        const { Data, Actors, Crew, Rent, Buy, Similar, Trailer } = this.state;
        const { navigation } = this.props.route.params;

        console.log(Data)
        if (!Data) {
            return null; // or render a loading spinner
        }
        const Time = () => {
            if (Data && Data.runtime) {
                const hours = Math.floor(Data.runtime / 60);
                const remainingMinutes = Data.runtime % 60;
                return <Text style = {styles.infobar}>{`${hours}h ${remainingMinutes}m`}</Text>;
            }
            return <Text>Loading...</Text>;
        };

        const Rating = () => {
            if (Data && Data.vote_average) {
              const rate = Data.vote_average.toString().substring(0, 3);
              return <Text style = {styles.infobar}>{`${rate} / 10`}</Text>;
            }
            return <Text>Loading...</Text>;
          };

        const Year = () => {
            if (Data && Data.release_date) {
                const year = Data.release_date.toString().substring(0, 4);
                return <Text style = {styles.infobar}>{`${year}`}</Text>;
            }
            return <Text>Loading...</Text>;
        };
        const openYouTubeVideo = () => {
            Linking.openURL(`https://www.youtube.com/watch?v=${Trailer}`)
              .catch((error) => console.error('Error opening YouTube video:', error));
            console.log(Trailer);
          };
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        style={styles.backgroundImage}
                        source={{ uri: `https://image.tmdb.org/t/p/original/${Data.backdrop_path}` }}
                    >
                    </Image>
                    <TouchableOpacity onPress={ ()=> openYouTubeVideo()}style={{justifyContent:"center",alignItems:"center",width:50, height: 50,borderRadius:50,borderWidth:2,borderColor:"#ccc", backgroundColor:"rgba(0, 0, 0, 0.2)", position:"absolute", top:100, left:192 }}>
                    {/* <View  > */}
                    <Entypo name="controller-play" size={25} color="white" />

                    {/* </View> */}
                    </TouchableOpacity>
                    <View style={styles.GenreContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {Data && Data.genres ? (
                                    Data.genres.map((genre) => (
                                        <TouchableOpacity onPress={() => navigation.navigate('Genre', { genre, navigation })}>
                                        <View key={genre.id} style={styles.GenreView}>
                                            <Text style = {styles.genreText}>{genre.name}</Text>
                                        </View>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text>Loading...</Text>
                                )}
                            </ScrollView>
                        </View>
                        <View style={styles.TimeAndRateContainer}>
                            <Year />
                            <Entypo name="dot-single" size={24} color="#51545b" />
                            <Time />
                            <Entypo name="dot-single" size={24} color="#51545b" />
                            <FontAwesome name="star" size={16} color="#f2c200" />
                            <Text>  </Text>
                            <Rating />
                        </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.overviewTitle}>Overview</Text>
                        <Text style={styles.overview}>{Data.overview}</Text>

                        <Text style={styles.sectionTitle}>Top Billed Cast</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={Actors}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.actorCard}>
                                    <TouchableOpacity onPress={() => navigation.push('Actors', { item, navigation })}>
                                    <Image style={styles.actorImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }} />
                                    <Text style={styles.actorName}>{item.name}</Text>
                                    <Text style={styles.actorCharacter}>{item.character}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <Text style={[styles.sectionTitle, {marginTop: 5}]}>You May Also Like</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={Similar}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={this.renderSimilarMovie}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : '#0e0e0e'
    },
    backgroundImage: {
        aspectRatio : 16/9,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 16,
    },
    backButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 8,
        borderRadius: 16,
    },
    titleContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    releaseDate: {
        color: 'white',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        color: 'gold',
        fontSize: 18,
        marginLeft: 8,
    },
    detailsContainer: {
        padding: 16,
    },
    overviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    overview: {
        fontSize: 16,
        marginBottom: 16,
        color: '#6b7176'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    actorCard: {
        marginRight: 8,
        alignItems: 'center',
    },
    actorImage: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 8,
    },
    actorName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
        color: 'white',
        width: 100
    },
    actorCharacter: {
        fontSize: 12,
        textAlign: 'center',
        color: 'grey',
        width: 100

    },
    watchOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    watchOptionTitle: {
        fontWeight: 'bold',
        marginRight: 4,
    },
    watchOptionText: {
        flex: 1,
        fontSize: 16,
    },
    similarCard: {
        marginRight: 8,
        alignItems: 'center',
    },
    similarImage: {
        width: 125,
        height: 187,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 8,
    },
    similarTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    crewCard: {
        marginRight: 8,
        alignItems: 'center',
    },
    crewImage: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 8,
    },
    crewName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    crewJob: {
        fontSize: 12,
        textAlign: 'center',
    },
    GenreContainer: {
        padding: 9,
        flexDirection: 'row',
        // backgroundColor: 'pink',
    },
    GenreView: {
        marginRight: 8,
        padding: 5,
        borderWidth: 1,
        borderColor: '#3d3f45',
        borderRadius: 7,
        backgroundColor: 'black',
    },
    TimeAndRateContainer: {
        // padding: 10,
        marginLeft: 14,
        flexDirection: 'row',
        // backgroundColor: 'purple',
        alignItems: 'center',
    },
    infobar:{
        color: '#3d3f45'
    },
    genreText :{
        color:'white',
    }
});

export default DetailsScreen;
