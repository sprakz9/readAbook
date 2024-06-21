import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList , Image , Dimensions } from 'react-native';
import firestore, { doc } from '@react-native-firebase/firestore';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PropTypes from 'prop-types';



const { width: screenWidth } = Dimensions.get('window');

interface Product {
  thumbnail: string;
  price: number;
  title: string;
  authors : string;
}


const Home = () => {
  const [product_book, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);  
  const [activeSlide, setActiveSlide] = useState(0);

   
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
        {/* <FlatList
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
        /> */}
        
        <Carousel
          data={product_book}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              </View>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={styles.author}>{item.authors}</Text>
              <View style={styles.box_price}>
                <Text style={styles.price}>฿ {item.price}</Text>
              </View>
            </View>
          )}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 60}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
         <Pagination
          dotsLength={product_book.length}
          activeDotIndex={activeSlide}
          containerStyle={{ paddingVertical: 10 }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#00bf6c',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
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
    width: 120,
    height: 150,
    resizeMode: 'contain',
    marginLeft : 3 , 
    marginTop : 3
  },
  thumbnailContainer : {
    alignItems: 'center',
  },
  productContainer: {
    flex: 1,
    // alignItems: 'center',
    marginBottom: 20,
    borderRadius : 2,
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
    color : "black",
    marginTop : 3
  },
  topHeader_Text : {
    fontSize : 25,
    fontWeight : "bold",
    textAlign : "center",
    color : "white",
    height : 45,
    lineHeight: 45,
  },
  topHeader_View : {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bf6c',
    height: 45
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 200,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

Home.propTypes = {
  product_book: PropTypes.array.isRequired,
};

export default Home