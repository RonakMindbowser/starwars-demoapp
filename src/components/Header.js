import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {isAndroid} from '../utils/Metrics';
import Colors from '../theme/Colors';
import imageConstants from '../res';
import NavigationService from '../navigation/NavigationService';

const Header = ({title}) => {
  return (
    <View style={styles.headerWrap}>
      <TouchableOpacity onPress={() => NavigationService.goBack()}>
        <Image
          source={imageConstants.backIcon}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.filterText}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  backIcon: {
    height: 40,
    width: 40,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: isAndroid ? 10 : 50,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primaryBlack,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  filterText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.black,
    marginLeft: 15,
  },
});
