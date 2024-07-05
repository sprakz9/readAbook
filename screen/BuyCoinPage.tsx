import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const BuyCoinsPage = () => {
  const [coinAmount, setCoinAmount] = useState('');

  const handleBuyCoins = async () => {
    const currentUser = auth().currentUser;

    // แปลงค่าจำนวนเหรียญที่จะซื้อจาก String -> Int
    const amount = parseInt(coinAmount);

    // เมื่อมีผู้ใช้ login และกรอกเป็นตัวเลข และมากกว่า 0
    if (currentUser && !isNaN(amount) && amount > 0) {
      try {
      
        const userId = currentUser.uid;
        const userDocRef = firestore().collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          const userData: any = userDoc.data();
          // อัพเดตเงิน
          await userDocRef.update({
            readAbook_coin: (userData.readAbook_coin || 0) + amount,
          });
          Alert.alert("ทำการซื้อคอยสำเร็จ! จำนวน" + amount.toString() + " คอยน์" , "กลับไปยังหน้าโปรไฟล์และรีเฟรชหน้า"); 
          setCoinAmount('');
        }
      } catch (error) {
        console.error('Error purchasing coins: ', error);
        Alert.alert('Error', 'An error occurred while purchasing coins.');
      }
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid amount of coins to purchase.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buy Coins</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter coin amount"
        keyboardType="numeric"
        value={coinAmount}
        onChangeText={setCoinAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleBuyCoins}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
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

export default BuyCoinsPage;
