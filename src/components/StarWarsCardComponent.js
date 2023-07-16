import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import imageConstants from '../res';

const StarWarsCardComponent = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageConstants.cardPlaceHolderImage}
        style={styles.image}
        imageStyle={styles.image}>
        <Image
          source={{uri: imageConstants.randomImageUrl}}
          style={styles.image}
        />
      </ImageBackground>
    </View>
  );
};

export default StarWarsCardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
  },
});
