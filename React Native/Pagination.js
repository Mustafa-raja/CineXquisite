import React, { PureComponent } from 'react';
import { StyleSheet, Animated, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

class Pagination extends PureComponent {
  render() {
    const { data, scrollX, index } = this.props;

    return (
      <View style={styles.container}>
        {data.map((_, idx) => {
          const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [12, 30, 12],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.1],
            extrapolate: 'clamp',
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#ccc', '#000', '#ccc'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={idx.toString()}
              style={[
                styles.dot,
                { width: dotWidth, backgroundColor },
                // idx === index && styles.dotActive,
              ]}
            />
          );
        })}
      </View>
    );
  }
}

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: '#000',
  },
});
