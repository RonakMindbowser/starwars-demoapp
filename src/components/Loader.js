import React from 'react';
import {View, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';

const Loader = props => {
  return (
    <View style={styles.loaderContainer}>
      <Lottie
        source={require('../res/animations/animation_lkbcz3qs.json')}
        autoPlay
        loop
        style={styles.animationStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationStyle: {
    width: '30%',
    height: '30%',
  },
});

export default Loader;
