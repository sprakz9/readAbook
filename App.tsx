import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import Login from './screen/Login';
import Home from './screen/Home';
import Mybook from './screen/Mybook';


const Tab = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={Login}
        /> */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        <Tab.Screen
        name = "Mybook"
        component = {Mybook}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App




