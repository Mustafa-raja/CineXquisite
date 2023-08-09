import React, { PureComponent } from 'react';
import { StyleSheet,  View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import DetailsScreen from './DetailsScreen';


class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      isLoading: true,
      showCard: false,
    };
    this.Stack = createStackNavigator();
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    try {
      const { genresID } = this.props;
      const urlI =
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=';
      const url = urlI + genresID;
      console.log(url);
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();
      const mango = json.results.slice(0, 9);

      this.setState({
        movie: mango,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        isLoading: false,
      });
    }
  };

  card = ({ item }) => {
    console.log(item);
  };

  render() {
    const { onLongPress, handlePress } = this.props;
    const { movie, isLoading } = this.state;
    // const Stack = createStackNavigator();
    // const navigation = useNavigation();
    
    return (
      <View style={styles.item}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#888" />
        ) : (
            <>
          <FlatList
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            showsHorizontalScrollIndicator = {false}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            data={movie}
            renderItem={({ item }) => {
              let image = 'https://image.tmdb.org/t/p/w400';
              image = image + item.poster_path;
              return (
                <TouchableOpacity onLongPress={() => {
                    onLongPress(item)
                    console.log(item)

                    }} onPress={() => handlePress(item)}>
                  <View style={styles.ImageComtainer}>
                    <Image style={styles.tinyLogo} source={{ uri: image }} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 7,
    marginVertical: 8,
  },
  tinyLogo: {
    width: 150,
    height: 225,
    borderRadius: 13,
  },
  ImageComtainer: {
    padding: 7,
  },
});

export default Item;
