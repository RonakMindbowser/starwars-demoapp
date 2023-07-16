import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from './utils/FlashMessage';
import AppContainer from './navigation/AppContainer';

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppContainer />
        <Toast config={toastConfig} visibilityTime={5000} />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
