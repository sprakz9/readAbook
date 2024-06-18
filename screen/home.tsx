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
          <Text style={styles.price}>Price: ${item.price}</Text>
        </View>
      )}
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
  userContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  thumbnail: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
});

export default Home