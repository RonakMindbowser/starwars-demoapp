import {LogBox, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from './utils/FlashMessage';
import AppContainer from './navigation/AppContainer';
import {Auth0Provider} from 'react-native-auth0';
import {Auth0Config} from './networkConfig/Endpoints';

LogBox.ignoreAllLogs();

//TODO : Need to compileSdkVersion==33 in react-native-pure-jwt build.gradle
const App = () => {
  return (
    <Auth0Provider domain={Auth0Config.domain} clientId={Auth0Config.clientId}>
      <View style={styles.container}>
        <Provider store={store}>
          <AppContainer />
          <Toast config={toastConfig} visibilityTime={5000} />
        </Provider>
      </View>
    </Auth0Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
