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
import {
  generateRandomColor,
  getRandomColorCode,
  intToRGB,
  isEmptyOrNull,
} from '../utils/Validations';

const StarWarsCardComponent = ({
  name,
  species,
  onLongPress,
  onPress,
  index,
}) => {
  let randomImage = `${imageConstants.randomImageUrl}${index}`;
  let value =
    species && [...species].length
      ? String(species[0])
          .split('https://swapi.dev/api/species/')[1]
          .split('/')[0]
      : '';
  let rgbColor = isEmptyOrNull(value)
    ? Colors.white
    : getRandomColorCode(value);

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: rgbColor}]}
      onPress={() => onPress(randomImage)}
      onLongPress={() => onLongPress(randomImage)}>
      <ImageBackground
        source={imageConstants.cardPlaceHolderImage}
        style={styles.image}
        imageStyle={styles.image}>
        <Image source={{uri: randomImage}} style={styles.image} />
      </ImageBackground>
      <View style={[styles.textContainer, {backgroundColor: rgbColor}]}>
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

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
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
