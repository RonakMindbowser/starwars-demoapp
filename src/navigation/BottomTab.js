import {Home, Settings} from '../screens';

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
      }}>
      <Tab.Screen name={routeNames.home} component={Home} />
      <Tab.Screen name={routeNames.settings} component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTab;
