import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Login from './screen/Login';
import Home from './screen/Home';
// import Book_detail from './screen/Book_detail';



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
        {/* <Stack.Screen
        name = "Book_detail"
        component = {Book_detail}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App




