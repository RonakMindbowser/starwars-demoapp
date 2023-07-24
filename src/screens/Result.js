import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '../components';
import Colors from '../theme/Colors';
import Strings from '../utils/Strings';

const Result = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <Header title={Strings.result} />
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
