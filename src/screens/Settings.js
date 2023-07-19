import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonComponent} from '../components';
import Strings from '../utils/Strings';
import StorageService from '../utils/AsyncStorage';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';
import {showSuccessToast} from '../utils/FlashMessage';

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
    <View style={styles.container}>
      <ButtonComponent title={Strings.logOut} onPress={onPressLogout} />
    </View>
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
});
