import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import StorageService from '../utils/AsyncStorage';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';
import HTTPService from '../networkConfig/HttpServices';
import {showErrorToast} from '../utils/FlashMessage';
import Strings from '../utils/Strings';
import Lottie from 'lottie-react-native';
import Colors from '../theme/Colors';

const Launch = () => {
  useEffect(() => {
    setTimeout(() => {
      handleNavigation();
    }, 5000);
  }, []);

  const handleNavigation = async () => {
    const accessToken = await StorageService.getItem(
      StorageService.Keys.accessToken,
    );
    if (accessToken) {
      const {isSuccess} = await HTTPService.checkTokenValidation();
      if (isSuccess) {
        NavigationService.replace(routeNames.bottomTab);
      } else {
        NavigationService.replace(routeNames.login);
        StorageService.clear();
        showErrorToast(Strings.tokenExpireMessage);
      }
    } else {
      NavigationService.replace(routeNames.login);
    }
  };

  return (
    <View style={styles.container}>
      <Lottie
        source={require('../res/animations/animation_lkbde9wl.json')}
        autoPlay
        loop
        style={styles.animationStyle}
      />
    </View>
  );
};

export default Launch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  animationStyle: {
    width: '100%',
    height: '100%',
  },
});
