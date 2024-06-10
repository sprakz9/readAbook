import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import home from './home'

const login = () => {
  return (
    <SafeAreaView>
        <View>
            <TouchableOpacity style = {styles.btn_login} onPress={home}>
                <Text style = {styles.text_login}>Login</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
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

export default login