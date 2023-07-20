import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Strings from '../utils/Strings';
import StorageService from '../utils/AsyncStorage';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';
import {showSuccessToast} from '../utils/FlashMessage';
import Lottie from 'lottie-react-native';

const Settings = () => {
  const onPressLogout = () => {
    Alert.alert(Strings.logOut, Strings.logoutMessage, [
      {
        text: Strings.no,
        onPress: () => null,
      },
      {
        text: Strings.yes,
        onPress: () => onLogout(),
      },
    ]);
  };

  const onLogout = async () => {
    await StorageService.clear();
    NavigationService.replace(routeNames.login);
    showSuccessToast(Strings.logoutSuccess);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressLogout}>
      <Lottie
        source={require('../res/animations/animation_lkbdyryh.json')}
        autoPlay
        loop
        style={styles.animationStyle}
      />
    </TouchableOpacity>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  animationStyle: {
    width: '40%',
    height: '40%',
  },
});
