import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from './screen/login';
import home from './screen/home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={login}
        />
        <Stack.Screen 
          name="home" 
          component={home} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App