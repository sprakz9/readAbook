import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Mybook = () => {
  const [purchasedBooks, setPurchasedBooks] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPurchasedBooks = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const userData: any = userDoc.data();
          const purchasedBookIds = userData.PurchasedBook || [];

          const bookPromises = purchasedBookIds.map(async (bookId: string) => {
            const bookDoc = await firestore().collection('product_book').doc(bookId).get();
            return { ...bookDoc.data(), book_id: bookDoc.id };
          });

          const booksData = await Promise.all(bookPromises);

          // Group books by mainName
          const groupedBooks = booksData.reduce((acc, book) => {
            const { mainName } = book;
            if (!acc[mainName]) {
              acc[mainName] = [];
            }
            acc[mainName].push(book);
            return acc;
          }, {});

          setPurchasedBooks(groupedBooks);
        }
      }
    } catch (error) {
      console.error('Error fetching purchased books: ', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPurchasedBooks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPurchasedBooks();
  };

  const handleTodetail = (item: any) => {
    // handle the detail view logic
    console.log('Navigate to detail view with item:', item);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <>
      <StatusBar backgroundColor="#00bf6c" barStyle="light-content"/>
      <View style={styles.topHeader_View}>
        <Text style={styles.topHeader_Text}>readAbook</Text>
      </View>
      <View style = {styles.ViewheaderText}>
        <Text style={styles.headerText}>หนังสือที่ซื้อแล้ว</Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {Object.keys(purchasedBooks).map((series: any) => (
            <View key={series}>
              <Text style={styles.seriesHeader}>{series}</Text>
              <FlatList
                data={purchasedBooks[series]}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({ item }) => (
                  <View style={styles.productContainer}>
                    <View style={styles.thumbnailContainer}>
                      <TouchableOpacity onPress={() => handleTodetail(item)}>
                        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                      </TouchableOpacity>
                    </View>
                    
                    <View style = {styles.titleContainer}>
                      <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                    </View>
                      
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor : "#CDCDCD"
  },
  topHeader_View: {
    backgroundColor: '#00bf6c',
    padding: 10,
    alignItems: 'center',
  },
  topHeader_Text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color : "black"
  },
  ViewheaderText : {
    backgroundColor :"white"
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnailContainer: {
    width: 120,
    height: 180,
    marginBottom: 10,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  titleContainer: {
    width: 120, // กว้างเท่า thumbnailContainer
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  seriesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 10,
    color : "black"
  },
});

export default Mybook;
