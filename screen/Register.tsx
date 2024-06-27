import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';

const Register = () => {
  const [textUserName, setUserName] = useState('');
  const [textEmail, setEmail] = useState('');
  const [textPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  const handleRegister = async () => {
    setLoading(true);

    try {
      if (!textUserName || !textEmail || !textPassword) {
        throw new Error("กรุณากรอกข้อมูลให้ครบ");
      }

      // สร้างผู้ใช้ใน Firebase Authentication
      const { user } = await auth().createUserWithEmailAndPassword(textEmail.trim(), textPassword.trim());

      if (!user) {
        throw new Error("ไม่สามารถสร้างบัญชีได้");
      }

      // เพิ่มข้อมูลผู้ใช้ใน Firestore
      await firestore().collection('users').doc(user.uid).set({
        userID: user.uid,
        username: textUserName.trim(),
        email: textEmail.trim(),
        createDate: firestore.FieldValue.serverTimestamp(),
        lastLogin: firestore.FieldValue.serverTimestamp(),
        // customField: ''  ตัวอย่างการสร้าง Field เปล่า เนาะ

      });

      Alert.alert("สร้างบัญชีสำเร็จ", "บัญชีของคุณถูกสร้างแล้ว");

      // ไปยัง Homepage
      navigation.navigate("Login");

    } catch (error : any) {
      Alert.alert("สร้างบัญชีล้มเหลว", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.register_header}>สมัครสมาชิก</Text>
      <View style={styles.line}></View>

      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        value={textUserName}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={textEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={textPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn_register} onPress={handleRegister}>
        <Text style={styles.text_register}>สมัครสมาชิก</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    justifyContent: 'center',
  },
  register_header: {
    marginTop: 26,
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
  line: {
    height: 2,
    backgroundColor: 'gray',
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  btn_register: {
    backgroundColor: "#32cd32",
    borderRadius: 10,
    marginHorizontal: 60,
    height: 30,
    justifyContent: "center",
    marginTop: 10,
  },
  text_register: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});

export default Register;
