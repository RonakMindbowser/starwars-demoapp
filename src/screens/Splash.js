import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';
import imageConstants from '../res';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      handleNavigation();
    }, 500);
  }, []);

  const handleNavigation = async () => {
    NavigationService.navigate(routeNames.launch);
  };

  return (
    <View style={styles.splashMainContainer}>
      <Image style={styles.splashImage} source={imageConstants.launchImage} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashMainContainer: {
    flex: 1,
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});
