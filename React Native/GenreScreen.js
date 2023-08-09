import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { PureComponent } from 'react';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (WIDTH - 32) / 3; // Width of each item including margin

class GenreScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Movies: null,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params.genre.id !== this.props.route.params.genre.id) {
        this.fetchMovies();

  }
  }
  fetchMovies = async () => {
    try {
      const { genre } = this.props.route.params;
      console.log(genre);
      const urlI =
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=';
      const url = urlI + genre.id;
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
      console.log(json);
      this.setState({
        Movies: json.results,
      });
    } catch (error) {
      console.error('Error:', error);
      this.setState({
      });
    }
  };

  render() {
    const { Movies } = this.state;
    const { navigation } = this.props.route.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          {Movies && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Movies</Text>
              <View style={styles.rowContainer}>
                {Movies.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    onPress={() => navigation.push('Details', { item, navigation })}
                  >
                    <Image
                      style={[styles.image, { width: ITEM_WIDTH, height: ITEM_WIDTH * 1.5 }]}
                      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: 'white',
    marginLeft: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 8,
  },
  card: {
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 125,
    height: 187,
    resizeMode: 'cover',
    borderRadius: 8,
  },

});

export default GenreScreen;
