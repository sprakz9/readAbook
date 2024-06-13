import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity , 
  Button , 
  SafeAreaView , 
  TextInput,
  Image,
  Alert,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';


  const Login = () => {
    
    const navigation: any = useNavigation();
    const [textUserName, setUserName] = React.useState('');
    const [textPassword, setPassword] = React.useState('');

    // const handleLogin = () => {
    //   setUserName("");
    //   setPassword("");
      
    //   if(textUserName.trim() == "123" && textPassword.trim() == "123") {
    //     navigation.navigate("Home"); 
    //   } else {
    //     Alert.alert("ไอดีหรือพาสไม่ถูกต้อง")
    //   } 
    // }
    const [error, setError] = React.useState('');

    const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(textUserName.trim(), textPassword.trim());
      setUserName('');
      setPassword('');
      navigation.navigate("Home");
    } catch (error : any) {
      setError(error.message);
    }
  }

      
  return (
    <>
      <SafeAreaView style = {styles.container}>
        <Text style = {styles.login_header}>ล็อกอินเข้าระบบ</Text>
          <View style={styles.line}></View>

          <View>
            <Text style = {{
              fontSize : 15,
              textAlign : "center",
              fontWeight : "bold",
              margin : 4
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
              <Text style = {{
                fontSize : 15,
                textAlign : "center",
                fontWeight : "bold",
                margin : 8
              }}>หรือเข้าสู่ระบบด้วย readAbook Account </Text>
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

      <TouchableOpacity style = {styles.btn_login} onPress={handleLogin} >
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
        justifyContent : "center",
        marginTop : 6
    },
    btn_register : {
        backgroundColor : "white",
        borderRadius : 10,
        marginHorizontal : 100,
        marginTop : 8,
        borderWidth: 1,
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
        borderRadius : 10,
        marginHorizontal : 30
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor : "white"
    },
    login_header : {
        marginTop : 26,
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
        borderWidth: 1,
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



