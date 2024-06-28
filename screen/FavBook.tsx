import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator , 
  RefreshControl, 
  ScrollView 
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FavBook = () => {
  const [favBooks, setFavBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavBooks = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userDocRef = firestore().collection('users').doc(userId);

      try {
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          const userData: any = userDoc.data();
          if (userData.FavMyBook) {
            const bookIds = userData.FavMyBook;

            const booksDataPromises = bookIds.map((bookId: string) => {
              return firestore().collection('product_book').doc(bookId).get();
            });

            const booksData = await Promise.all(booksDataPromises);
            const favBooksData = booksData.map(doc => ({ ...doc.data(), book_id: doc.id }));
            setFavBooks(favBooksData);
          }
        }
      } catch (error) {
        console.error('Error fetching favorite books: ', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  useEffect(() => {
    fetchFavBooks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavBooks();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.authors}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  bookContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FavBook