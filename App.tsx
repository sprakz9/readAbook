import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Icon } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './screen/Login';
import HomePage from './screen/Home';
import MybookPage from './screen/Mybook';
import FavBookPage from './screen/FavBook';
import RegisterPage from './screen/Register';
import ProfilePage from './screen/Profile';
import BuyCoinPage from './screen/BuyCoinPage';
import EditProfilePage from './screen/EditProfile';
import EditPassWordPage from './screen/EditPassWord';


const Tab = createMaterialBottomTabNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='หนังสือของฉัน' component={MybookPage}
      options={{
        tabBarIcon : () => (
          <Icon name = "library-outline" color={"green"} size={24} />
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
      <Tab.Screen name='ที่ชื่นชอบ' component={FavBookPage}
      options={{
        tabBarIcon : () => (
          <Icon name = "heart-outline" color={"green"} size={24} />
        )
      }}
      />
      <Tab.Screen name='โปรไฟล์' component={ProfilePage}
      options={{
        tabBarIcon : () => (
          <Icon name = "person-outline" color={"green"} size={24} />
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"component={Login}/>
        <Stack.Screen name="Register" component={RegisterPage}/>
        <Stack.Screen 
          name="Home" 
          component={HomeTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
        name='BuyCoinPage'
        component={BuyCoinPage}
        options={{title : "เติมคอยน์"}}
        />
        <Stack.Screen
        name='EditProfile'
        component={EditProfilePage}
        options={{title : "แก้ไขข้อมูลส่วนตัว"}}
        />
        <Stack.Screen
        name='EditPassWord'
        component={EditPassWordPage}
        options={{title : "แก้ไขรหัสผ่าน"}}
        />
        <Stack.Screen
        name='Profile'
        component={ProfilePage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App




