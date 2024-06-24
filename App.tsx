import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5,  Fontisto, Foundation, MaterialCommunityIcons, MaterialIcons 
// } from '@expo/vector-icons';
// import { Icon } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import Login from './screen/Login';
import HomePage from './screen/Home';
import MybookPage from './screen/Mybook';



const Tab = createMaterialBottomTabNavigator()
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='หนังสือของฉัน' component={MybookPage}
      options={{
        tabBarIcon : () => (
          <Icon name = "library-outline" color={"green"} size={24} />
          // <FontAwesome5 name="star" size={24} color="green" />
        )
      }}
      />
      <Tab.Screen name='ร้านค้า' component={HomePage}
      options={{
        tabBarIcon : () => (
          <Icon name = "storefront-outline" color={"green"} size={24} />
        )
      }}
      />
  </Tab.Navigator>
  )
}


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
          name="HomeTabs" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App




