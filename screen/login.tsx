import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <TouchableOpacity style = {styles.btn_login}>
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

