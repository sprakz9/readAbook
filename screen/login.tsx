import { View, Text, StyleSheet, TouchableOpacity , Button} from 'react-native'
import React from 'react'
import Home from './Home'

interface LoginProps {
    navigation: any;
  }
  
  const Login = ({ navigation }: LoginProps) => {
    const handleLoginPress = () => {
      navigation.navigate('home');
    };
      
  return (
        <TouchableOpacity style = {styles.btn_login} onPress={handleLoginPress}>
            <Text style = {styles.text_login}>Login</Text>
        </TouchableOpacity>

        
  )
}

const styles = StyleSheet.create({
   btn_login : {
        backgroundColor : "red",
        borderRadius : 8
    },
    text_login : {
        color : "white" , 
        textAlign : "center",
    }
})

export default Login



