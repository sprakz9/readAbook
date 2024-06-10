import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const login = () => {
  return (
    <SafeAreaView>
        <View>
            <TouchableOpacity>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    btn_login : {
        color : "red"
    },
})

export default login