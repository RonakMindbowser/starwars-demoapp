import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

const Loader = props => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="white" />
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
});

export default Loader;
