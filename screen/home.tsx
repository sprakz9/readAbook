import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList , Image } from 'react-native';
import firestore, { doc } from '@react-native-firebase/firestore';

interface Product {
  thumbnail: string;
  price: number;
  title: string;
}

const Home = () => {
  const [product_book, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);  
   
  useEffect(() => {
    const fetchData = async() => {
      try {
        const querySnapshot = await firestore().collection('product_book').get();
        const productsData = querySnapshot.docs.map(doc => {
          const { thumbnail, price, title } = doc.data();
          return { thumbnail, price, title };
        });
        setProduct(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  
  return (
      <View style={styles.container}>
        <FlatList
        data={product_book}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <View style={styles.productContainer}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

          <Text style={styles.title}>{item.title}</Text>

            <View style = {styles.box_price}>
              <Text style={styles.price}>฿ {item.price}</Text>
            </View>
        </View>
      )}
      numColumns={3}
    />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  thumbnail: {
    width: 110,
    height: 150,
    resizeMode: 'contain',
    marginLeft : 3
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius : 5,
    borderWidth : 0.5,
    margin : 1,
    position: 'relative',
    overflow : "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color : "black",
    alignSelf: 'flex-start',
    
  },
  price: {
    fontSize: 14,
    color: 'white',
    fontWeight : "bold",
  },
  box_price : {
    width : 50,
    height : 23,
    backgroundColor : "#00bf6c",
    borderRadius : 3,
    marginRight : 4,
    marginBottom : 3,
    alignSelf : "flex-end",
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
  },
});

export default Home