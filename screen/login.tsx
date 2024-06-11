import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity , 
  Button , 
  SafeAreaView , 
  TextInput,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'
import Home from './Home'

Icon.loadFont();
  const Login = () => {
    
    const [textUserName, setUserName] = React.useState('');
    const [textPassword, setPassword] = React.useState('');

      
  return (
    <>
      <SafeAreaView style = {styles.container}>
        <Text style = {styles.login_header}>ล็อคอินเข้าระบบ</Text>
          <View style={styles.line}></View>

          <View>
            <Text style = {{
              fontSize : 15,
              textAlign : "center",
              fontWeight : "bold",
            }}>เข้าส่ระบบด้วย ? </Text>

              {/* login with facebook */}

            <TouchableOpacity style = {styles.btn_facebook}> 
            <Image
              source={{uri : "https://web-asset.mebmarket.com/web/dist/assets/images/ic-facebook-white-bg.png"}}
              style = {styles.icon_facebook}
            />
              <Text style = {styles.text_facebook}> 
                เข้าสู่ระบบด้วย Facebook
              </Text>
            </TouchableOpacity>

                {/* login with google */}
            <TouchableOpacity style = {styles.btn_google}> 
            <Image
              source={{uri : "https://img.icons8.com/?size=100&id=17949&format=png&color=000000"}}
              style = {styles.icon_google}
            />
              <Text style = {styles.text_google}> 
                เข้าสู่ระบบด้วย Google
              </Text>
            </TouchableOpacity>
          </View>
      

      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={textUserName}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={textPassword}
        placeholder="Password"
      />
      <TouchableOpacity style = {styles.btn_login}>
        <Text style = {styles.text_login}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      <View>
        <Text style = {{
          textAlign : "center",
          fontSize : 16,
          marginTop : 8,
        }}>
          ไม่มีบัญชี ?
        </Text>
        <TouchableOpacity style = {styles.btn_register}>
        <Text style = {styles.text_register}>สมัครสมาชิก</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    </>
  )
}

const styles = StyleSheet.create({
   btn_login : {
        backgroundColor : "#32cd32",
        borderRadius : 10,
        marginHorizontal : 60,
        height : 30,
        justifyContent : "center"
    },
    btn_register : {
        backgroundColor : "white",
        borderRadius : 10,
        marginHorizontal : 100,
        marginTop : 8
    },
    text_login : {
        color : "white" , 
        textAlign : "center",
        fontSize : 18,
    }, 
    text_register : {
        color : "black" , 
        textAlign : "center",
        fontSize : 18,
  },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius : 10
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    login_header : {
        marginTop : 10,
        textAlign : "center",
        fontSize : 20,
        color : "black",
    },
    line: {
        height: 2,
        backgroundColor: 'gray',
        margin: 10,
    },
    btn_facebook : {
        backgroundColor : "blue",
        margin : 8,
        marginHorizontal : 80,
        borderRadius : 10,
        height : 40,
        justifyContent : "center",
        flexDirection : "row",
        alignItems: "center",
    },
    text_facebook : {
        color : "white",
        textAlign : "center",
        fontWeight : "bold",
        alignSelf: 'center',
    },
    icon_facebook : {
        width: 20, 
        height: 20, 
        resizeMode: 'contain', 
        alignSelf: 'center',
        marginRight: 10,
    },
    btn_google : {
        backgroundColor : "white",
        margin : 8,
        marginHorizontal : 80,
        borderRadius : 10,
        height : 40,
        justifyContent : "center",
        flexDirection : "row",
        alignItems: "center",
    },
    text_google : {
        color : "black",
        textAlign : "center",
        fontWeight : "bold",
        alignSelf: 'center',
    },
    icon_google : {
        width: 20, 
        height: 20, 
        resizeMode: 'contain', 
        alignSelf: 'center',
        marginRight: 26,
  }

    
  

})

export default Login



