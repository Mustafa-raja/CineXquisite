import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { PureComponent } from 'react';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (WIDTH - 32) / 3; // Width of each item including margin

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Movies: null,
      Actors: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const { userInput } = this.props.route.params;
      console.log(userInput);
      const convertedName = userInput.replace(/ /g, '%20');
      console.log(convertedName);

      const url = `https://api.themoviedb.org/3/search/multi?query=${convertedName}&include_adult=false&language=en-US&page=1`;
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

      const movies = json.results.filter((result) => result.media_type === 'movie');
      const actors = json.results.filter(
        (result) => result.media_type === 'person' && result.known_for_department === 'Acting'
      );

      this.setState({ Movies: movies, Actors: actors });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { Movies, Actors } = this.state;
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
                      source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {Actors && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Actors</Text>
              <View style={styles.rowContainer}>
                {Actors.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    onPress={() => navigation.push('Actors', { item, navigation })}
                  >
                    <Image
                      style={[styles.image, { width: ITEM_WIDTH, height: ITEM_WIDTH *1.2 }]}
                      source={{ uri: `https://image.tmdb.org/t/p/original${item.profile_path}` }}
                    />
                    <Text style={styles.actorName}>{item.name}</Text>
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
  actorName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: 'white',
    width: 100,
  },
});

export default Search;
