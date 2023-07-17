import {Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ImageZoom from 'react-native-image-pan-zoom';
import {screenHeight, screenWidth} from '../utils/Metrics';
import imageConstants from '../res';

const ZoomableImageComponent = ({url}) => {
  console.log('====================================');
  console.log('url-->', url);
  console.log('====================================');
  return (
    // // <ImageZoom
    // //   imageHeight={screenHeight / 2}
    // //   cropWidth={screenWidth}
    // //   cropHeight={screenHeight / 2}
    // //   imageWidth={screenWidth}
    // //   pinchToZoom={true}
    // //   style={styles.zoomImageStyle}
    // //   enableDoubleClickZoom>
    //   <ImageBackground source={imageConstants.cardPlaceHolderImage}>
    //     <Image source={{uri: url}} style={styles.imageView} />
    //   </ImageBackground>
    // {/* </ImageZoom> */}
    <ImageBackground
      source={imageConstants.cardPlaceHolderImage}
      style={styles.imageView}>
      <Image source={{uri: url}} style={styles.imageView} />
    </ImageBackground>
  );
};

export default ZoomableImageComponent;

const styles = StyleSheet.create({
  zoomImageStyle: {
    justifyContent: 'center',
    flex: 1,
  },
  imageView: {
    height: 400,
    width: screenWidth - 40,
    borderRadius: 10,
  },
});
