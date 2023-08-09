import React, { PureComponent } from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Linking } from 'react-native';
import { PresenceTransition } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

class CardScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      image: 'https://image.tmdb.org/t/p/original',
      vote: '',
      Trailer: ''
    };
  }

  componentDidMount() {
    console.log('componentdidMount');
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ image: 'https://image.tmdb.org/t/p/original' })
      console.log('componentDidUpdate');
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { id } = this.props;

    let url2 = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
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

    let url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
        },
      });
      const json = await response.json();
      // console.log(json);
      const posterPath = json.backdrop_path;
      if (posterPath) {
        this.setState((prevState) => ({
          data: json,
          isLoading: false,
          image: prevState.image + posterPath,
          vote: json.vote_average
        }));
      } else {
        this.setState({ data: json, isLoading: false });
      }
      // console.log(this.state.data);
    } catch (error) {
      console.error('Error:', error);
      this.setState({ isLoading: false });
    }


   

    console.log(id);
    console.log(this.state.Trailer);
    console.log(this.state.data);
  };


  render() {
    const { display, thePress, handlePress } = this.props;
    const { data, isLoading, image, vote,Trailer } = this.state;

    const openYouTubeVideo = () => {
      Linking.openURL(`https://www.youtube.com/watch?v=${Trailer}`)
        .catch((error) => console.error('Error opening YouTube video:', error));
      console.log(Trailer);
    };
    const Rating = (vote) => {
      console.log(vote.vote);
      // const rate = vote.vote.toString().substring(0,0)
      // console.log(rate);
      let first = 'star-o'
      let second = 'star-o'
      let third = 'star-o'
      let fourth = 'star-o'
      let fifth = 'star-o'
      if(vote.vote >= 1)
      {
        first = 'star-half-empty'
        if(vote.vote >= 2)
        {
          first = 'star'
        }
      }
      if(vote.vote >= 3)
      {
        second = 'star-half-empty'
        if(vote.vote >= 4)
        {
          second = 'star'
        }
      }
      if(vote.vote >= 5)
      {
        third = 'star-half-empty'
        if(vote.vote >= 6)
        {
          third = 'star'
        }
      }
      if(vote.vote >= 7)
      {
        fourth = 'star-half-empty'
        if(vote.vote >= 8)
        {
          fourth = 'star'
        }
      }
      if(vote.vote >= 9)
      {
        fifth = 'star-half-empty'
        if(vote.vote >= 10)
        {
          fifth = 'star'
        }
      }
      return(
        <View style={styles.ratingContainer}>
        <FontAwesome name={first} size={16} color="#f2c200" />
        <FontAwesome name={second} size={16} color="#f2c200" />
        <FontAwesome name={third} size={16} color="#f2c200" />
        <FontAwesome name={fourth} size={16} color="#f2c200" />
        <FontAwesome name={fifth} size={16} color="#f2c200" />
        <Text style = {styles.ratingText}>  {vote.vote.toString().substring(0, 3)}</Text>
      </View>
      )
    }

    if (display) {
      return (
        <>
          <TouchableWithoutFeedback style={styles.overlay} onPress={thePress}>
            <View style={styles.overlay}>
              <PresenceTransition
                style={styles.overlay1}
                visible={display}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 250,
                  },
                }}
              >
                <TouchableWithoutFeedback onPress={() => { console.log('meow') }}>
                  <View style={styles.card}>
                    <View style={styles.CardContainer}>
                      <View style={styles.imageContainer}>
                        <Image style={styles.tinyLogo} source={{ uri: image }} />
                        <LinearGradient
                          colors={['rgba(0, 0, 0, 0)', 'rgba(22, 22, 22, 1)']}
                          style={styles.gradient}
                        />
                       <Rating vote = {vote}/>
                        <View style={styles.buttonContainer}>
                          <View style={styles.dumm} />
                          <TouchableOpacity onPress={ ()=> openYouTubeVideo()}>
                            <View style={styles.TrailerButton}>
                            <Entypo name="controller-play" size={15} color="white" />
                              <Text style={styles.buttonText}>Trailer</Text>
                              </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handlePress(this.state.data)}>
                            <View style={styles.DetailsButton}><Text style={styles.buttonText}>Details</Text></View>
                          </TouchableOpacity>
                          <View style={styles.dumm} />
                        </View>
                      </View>

                      <View style={styles.infoContainer} >
                        <View style={styles.textContainer}>
                          <Text style={styles.text}>{this.state.data.original_title}</Text>
                        </View>
                        <View style={styles.textContainer1}>
                          <Text style={styles.ProlougeHeader}>Prologue:</Text>
                          
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.ProlougeBody}>{this.state.data.overview}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </PresenceTransition>
            </View>
          </TouchableWithoutFeedback>
        </>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#171717',
    borderRadius: 15,
    elevation: 100,
    width: '80%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    color: '#cdd6dc',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 10
  },
  ProlougeHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: '#cdd6dc',
    paddingLeft: 15,
    // paddingRight: 15
    // paddingTop: 5,
    paddingBottom: 5
  },
  ProlougeBody: {
    fontSize: 11,
    fontWeight: '300',
    color: '#7a7f83',
    paddingLeft: 15,
    paddingRight: 15
  },
  CardContainer: {
    // backgroundColor: '#009100',
    flex: 1,
    alignSelf: 'stretch',
    margin: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  TrailerButton: {
    backgroundColor: '#424242',
    height: 30,
    width: 100,
    // paddingHorizontal: 10, // Add horizontal padding
    marginBottom: 20,
    borderRadius: 25,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center', // Center the buttons horizontally
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 2, // Updated to flex: 3
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    position: 'relative',

  },
  tinyLogo: {
    flex: 1,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1, // Updated to flex: 1
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // justifyContent: 'center',

  },
  textContainer: {
    // backgroundColor:'pink'
  },
  textContainer1: {
    // backgroundColor:'pink'
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%', // Updated to height: '100%'
  },
  buttonContainer: {
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
  ratingContainer: {
    position: 'absolute',
    top: 7,
    left: 7,
    right: 0,
    height: 30,
    width: 130,
    backgroundColor: '#424242',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 5,
    flexDirection: 'row'
  },
  ratingText:{
    color: 'white',
    fontSize: 15,
    fontWeight : '500'
  }

});

export default CardScreen;
