import React, { PureComponent } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
// import Slides from '../data';
import SlideItem from './SlideItem';



class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      scrollX: new Animated.Value(0),
      movie:[],
      isLoading: false,
    };
  }

  handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: this.state.scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  handleOnViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      this.setState({ index: viewableItems[0].index });
    }
  };

  viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    try {

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA1ZjE1YmNmOThmYWVhN2IwZGE1ZTc5NjNiMzRiZiIsInN1YiI6IjY0OGUyMGQwYzNjODkxMDBjYWRhM2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UNQ4mSkYnpcmIOEgbJvMuzDRReoeTdgcxrVVZO59AQs',
        },
      };

      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
      const json = await response.json();
      const firstFiveMovies = json.results.slice(0, 5);
      this.setState({
        movie: firstFiveMovies,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { index, scrollX,movie } = this.state;
    const { handlePress} = this.props;
    return (
      <View>
        <FlatList
          data={movie}
          renderItem={({ item }) => <SlideItem handlePress = {handlePress} item={item} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleOnScroll}
          onViewableItemsChanged={this.handleOnViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
        />
        {/* <Pagination data={movie} scrollX={scrollX} index={index} /> */}
      </View>
    );
  }
}

export default Carousel;

const styles = StyleSheet.create({});
