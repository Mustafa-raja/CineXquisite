import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Item from './RowsForLibrary';
import CardScreen from './CardScreen';
import Carousel from './carousel';
import { AntDesign } from '@expo/vector-icons';

class Library extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      display: false,
      id: null,
      showTextInput: false,
      userInput: '',
    };
  }

  handlePress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('Details', { item, navigation });
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.fetchData();
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity style={[{ marginRight: 20 }]} onPress={this.showTextInput}>
            <AntDesign name="search1" size={28} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
        },
      });
      const json = await response.json();
      this.setState({ data: json.genres, isLoading: false });
    } catch (error) {
      console.error('Error:', error);
      this.setState({ isLoading: false });
    }
  };

  handleLongPress = (item) => {
    this.setState({ id: item.id });
    this.setState({ display: true });
  };

  thePress = () => {
    this.setState({ display: false });
  };

  showTextInput = () => {
    this.setState({ showTextInput: !this.state.showTextInput });
  };

  handleInputChange = (text) => {
    this.setState({ userInput: text });
  };

  handleSubmit = () => {
    const { navigation } = this.props;
    const { userInput } = this.state;
    console.log('User input:', userInput);

    navigation.navigate('Search', { userInput, navigation });

    this.setState({ showTextInput: false, userInput: '' });
  };

  render() {
    const { data, isLoading, display, id, showTextInput, userInput } = this.state;
    const { navigation } = this.props;

    let sections = [];
    data.forEach((item) =>
      sections.push({
        name: item.name,
        id: item.id,
      })
    );

    sections.unshift({
      name: 'Carousel',
      id: null, // or any unique identifier for the Carousel item
    });

    console.log(sections)
    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#888" />
        ) : (
          <>
            <FlatList
              data={sections}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                if (item.name === 'Carousel') {
                  return <Carousel handlePress={this.handlePress} />;
                } else {
                  const genre = item
                  return (
                    <View>
                      <View style = {styles.GenreContainer}>
                      <Text style={styles.header}>{item.name}</Text>
                      <View style = {[{alignItems: 'center'}]}>
                        <TouchableOpacity onPress={ () => navigation.navigate('Genre', { genre, navigation })}>
                      <Text style = {styles.ViewMore}>View More</Text>
                      </TouchableOpacity>
                      </View>
                      </View>
                      <Item genresID={item.id} onLongPress={this.handleLongPress} handlePress={this.handlePress} />
                    </View>
                  );
                }
              }}
            />
            {showTextInput && (
              <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={this.handleInputChange}
                    value={userInput}
                    placeholder="Search for movies or actors"
                    placeholderTextColor="#888"
                  />
                  <Button color="#620001" title="Submit" onPress={this.handleSubmit} />
                </View>
              </KeyboardAvoidingView>
            )}
            <CardScreen handlePress={this.handlePress} display={display} id={id} thePress={this.thePress} />
          </>
        )}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  headerContainer: {
    padding: 7,
  },
  header: {
    paddingTop: 10,
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: 'white'
},
  Card: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '80%',
    minHeight: 115, // Adjust the height as needed
    backgroundColor: '#222',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: 'white',
  },
  GenreContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ViewMore: {
    color : 'red',
    fontSize : 17,
    marginTop : 10,
    marginRight :10
  },
});

export default Library;
