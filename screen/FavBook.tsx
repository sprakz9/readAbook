import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet , Button  ,ActivityIndicator ,TouchableOpacity , Image, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import firestore, { doc, getDoc, getDocs, collection, query, where } from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { getFavoriteBooks, addFavoriteBook } from '../services/FirestoreService';
import { getCurrentUser, signOut } from '../services/AuthService';
import  firebase  from '@react-native-firebase/app';



const FavBook = () => {
  const [loading, setLoading] = useState(true);
  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);
  const navigation: any = useNavigation();
    
  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลหนังสือที่ชอบจาก Firestore
    const fetchFavoriteBooks = async () => {
      const userID = firebase.auth().currentUser?.uid;
      if (userID) {
        try {
          const favoritesRef = firebase.firestore().collection('users').doc(userID).collection('FavoritesCollection');
          const snapshot = await favoritesRef.get();
  
          // สร้างอาร์เรย์ของ promise สำหรับการดึงข้อมูลรายละเอียดของหนังสือ
          const fetchBookDetailsPromises = snapshot.docs.map(async (doc) => {
            const book_id = doc.id;
            const bookDoc = await firebase.firestore().collection('product_book').doc(book_id).get();
            const bookData = bookDoc.data();
              console.log('Book details:', bookData);
            return bookData;
          });
  
          // รอให้ทุก promise ดึงข้อมูลเสร็จสิ้น
          const bookDetails: any = await Promise.all(fetchBookDetailsPromises);
          setFavoriteBooks(bookDetails);
          
        } catch (error) {
          console.error('Error fetching favorite books:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavoriteBooks();
    
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut(); // ออกจากระบบ
      navigation.navigate('Login'); // นำทางไปที่หน้า Login หลังจากออกจากระบบ
    } catch (error) {
      console.error(error); // แสดง error ในกรณีที่เกิดข้อผิดพลาด
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Favorite Books</Text>
    <FlatList
      data={favoriteBooks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ marginBottom: 20, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 10 }}
          onPress={() => {
            // ทำการ navigate ไปยังหน้ารายละเอียดหนังสือหรือทำอย่างอื่นตามต้องการ
          }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: 100, height: 150, borderRadius: 10 }}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{item.book_id}</Text>
        </TouchableOpacity>
      )
    }
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookItem: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default FavBook