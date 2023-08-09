import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, FlatList, TouchableOpacity, Linking, Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Constants from 'expo-constants';


class ActorsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            Data: null,
            Twitter: null,
            Instagram: null,
            IMDb: null,
            KnownFor: null,
            convertedName: null,
            showFullBiography: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const { item } = this.props.route.params;
        console.log(item);
        let url2 = `https://api.themoviedb.org/3/person/${item.id}?language=en-US`;
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
            if (json.gender == 1) {
                json.gender = 'Female';
            }
            else if (json.gender == 2) {
                json.gender = 'Male';
            }
            else if (json.gender == 3) {
                json.gender = 'Non-binary';
            }
            else {
                json.gender = 'Not set / not specified';
            }
            this.setState({ Data: json });
            const name = json.name;
            const convert = name.replace(/ /g, '%20');
            this.setState({ convertedName: convert });
        } catch (error) {
            this.setState({ Data: null });
            console.error('Error:', error);
        }
        let url3 = `https://api.themoviedb.org/3/person/${item.id}/external_ids`;
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

            this.setState({ Twitter: json.twitter_id, Instagram: json.instagram_id, IMDb: json.imdb_id });
        } catch (error) {
            console.error('Error:', error);
        }


        let url4 = `https://api.themoviedb.org/3/search/person?query=${this.state.convertedName}&include_adult=false&language=en-US&page=1`;
        try {
            const response = await fetch(url4, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
                },
            });
            const json = await response.json();
            const theMovie = json.results;
            for (let i = 0; i < theMovie.length; i++) {
                if (theMovie[i].id == item.id) {
                    this.setState({ KnownFor: theMovie[i].known_for })
                    break;
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }

    };

    renderSimilarMovie = ({ item }) => {
        const { navigation, Trailer } = this.props.route.params;
        return (
            <View style={styles.similarCard}>
                <TouchableOpacity onPress={() => navigation.push('Details', { item, navigation })}>
                    <Image style={styles.similarImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
                    {/* <Text style={styles.similarTitle}>{item.title}</Text> */}
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
        const { Data, Twitter, Instagram, IMDb, KnownFor, showFullBiography } = this.state;
        const { navigation } = this.props.route.params;

        console.log(Data)

        if (!Data) {
            return null;
        }

        const openTwitter = () => {
            Linking.openURL(`https://twitter.com/${Twitter}?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor`)
                .catch((error) => console.error('Error opening YouTube video:', error));
        };
        const openInstagram = () => {
            Linking.openURL(`https://www.instagram.com/${Instagram}/?hl=en`)
                .catch((error) => console.error('Error opening YouTube video:', error));
        };
        const openIMDb = () => {
            Linking.openURL(`https://www.imdb.com/name/${IMDb}/`)
                .catch((error) => console.error('Error opening YouTube video:', error));
        };
        const handleSeeMore = () => {
            this.setState({ showFullBiography: true });
        };
        const biographyButtonText = showFullBiography ? "" : "See more";
        const biography = showFullBiography ? Data.biography : Data.biography.slice(0, 250) + ".... ";

        return (
            <ScrollView >
                <View style={styles.container}>

                    <View style={[{ width: '100%' }]}>

                        <View style={[]}>
                            <TouchableOpacity style = {[{width: 50}, {marginTop : Constants.statusBarHeight+14 }, {marginLeft : 14 }]} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={28} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ImageContainer}>
                            <Image
                                style={styles.actorImage}
                                source={{ uri: `https://image.tmdb.org/t/p/w500${Data.profile_path}` }}
                            >
                            </Image>
                        </View>

                        <View style={styles.NameContainer}>
                            <Text style={styles.Name}>{Data.name}</Text>
                        </View>
                        <View style={styles.IconContainer}>
                            <TouchableOpacity onPress={() => openTwitter()} >
                                <Entypo name="twitter" size={37} color="white" />
                            </TouchableOpacity>
                            <View style={[{ width: 17 },]}></View>
                            <TouchableOpacity onPress={() => openInstagram()}>
                                <Entypo name="instagram" size={35} color="white" />
                            </TouchableOpacity>
                            <View style={[{ width: 17 },]}></View>
                            <TouchableOpacity onPress={() => openIMDb()}>
                                <FontAwesome name="imdb" size={37} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.overviewTitle}>Personal Info</Text>
                        <View style={[{ marginTop: 5, marginBottom: 15 }]}>
                            <Text style={styles.infoView} >Known For</Text>
                            <Text style={styles.infoText}>{Data.known_for_department}</Text>
                            <Text style={styles.infoView} >Gender</Text>
                            <Text style={styles.infoText}>{Data.gender}</Text>
                            <Text style={styles.infoView} >Birthdate</Text>
                            <Text style={styles.infoText}>{Data.birthday}</Text>
                            <Text style={styles.infoView} >Place of Birth</Text>
                            <Text style={styles.infoText}>{Data.place_of_birth}</Text>
                        </View>
                        <Text style={styles.overviewTitle}>Biography</Text>

                        <Text style={styles.overview}>{biography}</Text>
                        {Data.biography.length > 100 && (
                            <TouchableOpacity onPress={handleSeeMore}>
                                <Text style={styles.seeMoreText}>{biographyButtonText}</Text>
                            </TouchableOpacity>
                        )}
                        <Text style={[styles.overviewTitle, { marginTop: 5 }]}>Known For</Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={KnownFor}
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
    ImageContainer: {
        // marginTop: 11,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    NameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconContainer: {
        // marginTop: 5,
        marginBottom: 5,
        // marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        backgroundColor: '#0e0e0e'
    },
    backgroundImage: {
        aspectRatio: 16 / 9,
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
        fontWeight: '600',
        marginBottom: 8,
        color: 'white'
    },
    infoView: {
        fontSize: 16,
        fontWeight: '600',
        // marginBottom: 8,
        color: 'white'
    },
    Name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    overview: {
        fontSize: 16,
        marginBottom: 5,
        color: '#6b7176'
    },
    infoText: {
        fontSize: 14,
        marginBottom: 3,
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
        width: 150,
        height: 225,
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
    infobar: {
        color: '#3d3f45'
    },
    genreText: {
        color: 'white',
    },
    seeMoreText: {
        color: 'red',
    },

});

export default ActorsScreen;
