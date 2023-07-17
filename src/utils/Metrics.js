import {Dimensions, PixelRatio, Platform} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
const scale = screenWidth / 320;

export const widthPercentageToDP = widthPercent => {
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const heightPercentageToDP = heightPercent => {
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export const normalize = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export default {
  screenWidth,
  screenHeight,
  widthPercentageToDP,
  heightPercentageToDP,
  normalize,
};
