import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity,
    Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
const { width, height } = Dimensions.get('screen');

class SlideItem extends PureComponent {
    constructor(props) {
        super(props);
        this.translateYImage = new Animated.Value(40)
        this.state ={
            Trailer : " "
        }
    }

    componentDidMount() {
        Animated.timing(this.translateYImage, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.bounce,
        }).start();
        this.fetchData()
    }


    fetchData = async () => {
        const { item } = this.props;
    
        let url2 = `https://api.themoviedb.org/3/movie/${item.id}/videos?language=en-US`;
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
          const officialTrailer = json.results.find(result => result.name === "Official Trailer");
          if (officialTrailer) {
            console.log("Official trailer")
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
    }

    render() {
        const { item, handlePress } = this.props;
        const {Trailer} = this.state;
        const openYouTubeVideo = () => {
            Linking.openURL(`https://www.youtube.com/watch?v=${Trailer}`)
              .catch((error) => console.error('Error opening YouTube video:', error));
            console.log(Trailer);
          };
        const imageSource = { uri: 'https://image.tmdb.org/t/p/original' + item.poster_path };
        return (
            <View style={styles.container}>
                <Image
                    source={imageSource}
                    resizeMode="cover" // Use "cover" instead of "contain"
                    style={styles.image}
                />
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'rgba(15, 15, 15, 1)']}
                    style={styles.gradient}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.dumm} />
                    <TouchableOpacity onPress={() => openYouTubeVideo() }>
                        <View style={styles.TrailerButton}>
                        <Entypo name="controller-play" size={15} color="white" />
                            <Text style={styles.buttonText}>Trailer</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => handlePress(item) }>
                        <View style={styles.DetailsButton}><Text style={styles.buttonText}>Details</Text></View>
                    </TouchableOpacity>
                    <View style={styles.dumm} />
                </View>
                {/* <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View> */}
            </View>
        );
    }

}

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        width,
        height: 550,
        alignItems: 'center',
        overflow: 'hidden', // Add this to clip the gradient within the container
    },
    image: {
        width: '100%',
        height: '100%', // Adjusted to fill the container
    },
    content: {
        flex: 0.4,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 18,
        marginVertical: 12,
        color: '#333',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
    },
    TrailerButton: {
        flexDirection: 'row',
        backgroundColor: '#424242',
        height: 30,
        width: 100,
        // paddingHorizontal: 10, // Add horizontal padding
        marginBottom: 20,
        borderRadius: 25,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center', // Center the buttons horizontally
    }, buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly', // Center the buttons horizontally
        height: 60,
        flexDirection: 'row',
    },
    DetailsButton: {
        backgroundColor: 'transparent',
        height: 30,
        width: 100,
        // paddingHorizontal: 10, // Add horizontal padding
        marginBottom: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dumm: {
        height: 30,
        width: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
    },
});
