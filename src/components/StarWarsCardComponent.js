import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import imageConstants from '../res';
import Colors from '../theme/Colors';

const StarWarsCardComponent = ({name, species, onLongPress, onPress}) => {
  let randomImage = imageConstants.randomImageUrl;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(randomImage)}
      onLongPress={() => onLongPress(randomImage)}>
      <ImageBackground
        source={imageConstants.cardPlaceHolderImage}
        style={styles.image}
        imageStyle={styles.image}>
        <Image
          source={{uri: imageConstants.randomImageUrl}}
          style={styles.image}
        />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StarWarsCardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  image: {
    height: 300,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    paddingVertical: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 18,
    color: Colors.black,
    fontWeight: '700',
  },
});
