import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Colors from '../theme/Colors';

const ButtonComponent = ({
  title,
  onPress,
  disabled,
  containerStyle,
  titleStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blueGrey,
    height: 40,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  titleStyle: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '700',
  },
});
