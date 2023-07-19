import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Loader} from '../components';
import StorageService from '../utils/AsyncStorage';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';
import HTTPService from '../networkConfig/HttpServices';
import {showErrorToast} from '../utils/FlashMessage';
import Strings from '../utils/Strings';

const Splash = () => {
  useEffect(() => {
    handleNavigation();
  }, []);

  const handleNavigation = async () => {
    const accessToken = await StorageService.getItem(
      StorageService.Keys.accessToken,
    );
    console.log('accesstoken-->', accessToken);
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

  return <Loader />;
};

export default Splash;

const styles = StyleSheet.create({});
