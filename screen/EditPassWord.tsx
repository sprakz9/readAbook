import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight } from 'react-native'; 
import auth from '@react-native-firebase/auth'; 
import { useNavigation } from '@react-navigation/native';


const ChangePassword = () => {
  // สร้าง state สำหรับเก็บข้อมูล currentPassword และ newPassword
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation: any = useNavigation();

  // ตรวจสอบสิทธิ์ผู้ใช้
  const reauthenticate = async (currentPassword : any) => {
    const user = auth().currentUser; // ดึงข้อมูลผู้ใช้ปัจจุบันจาก auth

    if (user && user.email) { // ตรวจสอบว่ามีผู้ใช้และผู้ใช้นั้นมีอีเมล
      const cred = auth.EmailAuthProvider.credential(user.email, currentPassword); // สร้าง credential สำหรับการตรวจสอบสิทธิ์
      return user.reauthenticateWithCredential(cred); // ทำการตรวจสอบสิทธิ์
    } else {
      return null; // ถ้าไม่มีผู้ใช้หรือผู้ใช้ไม่มีอีเมล ส่งคืนค่า null
    }
  };

  // ฟังก์ชันสำหรับเปลี่ยนรหัสผ่าน
  const handleChangePassword = async () => {
    const user = auth().currentUser; // ดึงข้อมูลผู้ใช้ปัจจุบันจาก auth

    if (user) { // ตรวจสอบว่ามีผู้ใช้
      try {
        const reauthResult = await reauthenticate(currentPassword); // ตรวจสอบสิทธิ์ด้วย currentPassword
        if (reauthResult) { // ถ้าการตรวจสอบสิทธิ์สำเร็จ
          await user.updatePassword(newPassword); // อัพเดตเป็น newPassword
          Alert.alert('Password updated successfully!'); 
          setCurrentPassword(''); // รีเซ็ต currentPassword
          setNewPassword(''); // รีเซ็ต newPassword
          navigation.navigate("Profile")
        } else {
          Alert.alert('Error', 'No authenticated user found.'); 
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while changing your password.'); // แสดงข้อผิดพลาดในการเปลี่ยนรหัสผ่าน
      }
    } else {
      Alert.alert('Error', 'No authenticated user found.'); // แสดงข้อผิดพลาดถ้าไม่พบผู้ใช้ที่ตรวจสอบสิทธิ์
    }
  };

  return (
    <View style={styles.container}> 
      <Text style={styles.label}>รหัสผ่านปัจจุบัน</Text> 
      <TextInput
        style={styles.input} 
        value={currentPassword} 
        onChangeText={setCurrentPassword} 
        secureTextEntry
      />
      <Text style={styles.label}>รหัสผ่านใหม่</Text> 
      <TextInput
        style={styles.input} 
        value={newPassword} 
        onChangeText={setNewPassword} 
        secureTextEntry 
      />
      <TouchableHighlight style = {styles.button} onPress={handleChangePassword}>
        <Text style = {styles.buttonText}>เปลี่ยนรหัสผ่าน</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color : "#00bf6c"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#00bf6c',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePassword; 
