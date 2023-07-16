import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './NavigationService';
import {createStackNavigator} from '@react-navigation/stack';
import {routeNames} from '../utils/routeNames';
import {Home} from '../screens';

const options = {
  options: {
    headerShown: false,
    gestureEnabled: false,
  },
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen {...options} name={routeNames.home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
