import {Image, Platform, StyleSheet} from 'react-native';
import {Home, Settings} from '../screens';
import imageConstants from '../res';
import Strings from '../utils/Strings';
import {isAndroid} from '../utils/Metrics';
import Colors from '../theme/Colors';

const {createBottomTabNavigator} = require('@react-navigation/bottom-tabs');
const {routeNames} = require('../utils/RouteNames');
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={routeNames.home}
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => null,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name={routeNames.home}
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={imageConstants.homeIcon}
                style={[
                  styles.imageStyle,
                  {tintColor: focused ? Colors.blueGrey : Colors.black},
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={routeNames.settings}
        component={Settings}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={imageConstants.settingsIcon}
                style={[
                  styles.imageStyle,
                  {tintColor: focused ? Colors.blueGrey : Colors.black},
                ]}
                resizeMode="contain"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

export const styles = StyleSheet.create({
  imageStyle: {
    height: 35,
    width: 35,
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
    height: isAndroid ? 70 : 80,
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
        elevation: 24,
      },
    }),
    borderTopWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
  },
});
