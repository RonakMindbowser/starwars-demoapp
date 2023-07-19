import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import {createStackNavigator} from '@react-navigation/stack';
import {routeNames} from '../utils/RouteNames';
import BottomTab from './BottomTab';
import {Login, Splash} from '../screens';

const options = {
  options: {
    headerShown: false,
    gestureEnabled: false,
  },
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={routeNames.splash}>
        <Stack.Screen
          {...options}
          name={routeNames.splash}
          component={Splash}
        />
        <Stack.Screen {...options} name={routeNames.login} component={Login} />
        <Stack.Screen
          {...options}
          name={routeNames.bottomTab}
          component={BottomTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
