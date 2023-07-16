import {StyleSheet, View} from 'react-native';
import AppNavigator from './AppNavigator';

const AppContainer = props => {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
