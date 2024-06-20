import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList , Image } from 'react-native';
import firestore, { doc } from '@react-native-firebase/firestore';

interface Product {
  thumbnail: string;
  price: number;
  title: string;
  authors : string;
}

const Home = () => {
  const [product_book, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);  
   
  useEffect(() => {
    const fetchData = async() => {
      try {
        const querySnapshot = await firestore().collection('product_book').get();
        const productsData = querySnapshot.docs.map(doc => {
          const { thumbnail, price, title , authors} = doc.data();
          return { thumbnail, price, title , authors };
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
    <>
      <View style = {styles.topHeader_View}>
          <Text style = {styles.topHeader_Text}>readAbook</Text>
      </View>

      <View>
          <Text style = {styles.headerText}>หนังสือทั้งหมด</Text>
      </View>

      <View style={styles.container}>
        <FlatList
        data={product_book}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
        <View style={styles.productContainer}>
          
          <View style = {styles.thumbnailContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail}/>
          </View>

            <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
              {item.title}
            </Text> 

            <Text style = {styles.author}>{item.authors}</Text>

            <View style = {styles.box_price}>
              <Text style={styles.price}>฿ {item.price}
              </Text>
            </View>
        </View>
      )}
      numColumns={3}
    />
      </View>
  </>
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
    marginLeft : 3 , 
  },
  thumbnailContainer : {
    alignItems: 'center',
  },
  productContainer: {
    flex: 1,
    // alignItems: 'center',
    marginBottom: 20,
    borderRadius : 5,
    borderWidth : 0.5,
    margin : 1,
    position: 'relative',
    overflow : "hidden",
    height: 250, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color : "black",
    textAlign : "left",
    paddingHorizontal: 3,
  },
  price: {
    fontSize: 14,
    color: 'white',
    fontWeight : "bold",
  },
  box_price : {
    width : 50,
    height : 23,
    bottom: 0,
    right: 0,
    backgroundColor : "#00bf6c",
    borderRadius : 3,
    marginRight : 4,
    marginBottom : 3,
    alignSelf : "flex-end",
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  author : {
    textAlign : "left",
    paddingHorizontal : 3,
  },
  headerText : {
    textAlign : "center",
    fontSize : 26,
    color : "black"
  },
  topHeader_Text : {
    fontSize : 25,
    fontWeight : "bold",
    backgroundColor : "#00bf6c",
    textAlign : "center",
    color : "white",
    height : 45,
  },
  topHeader_View : {
    justifyContent: 'center',
  }
});

export default Home