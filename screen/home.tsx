import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList , Image , TouchableOpacity, Alert, Button, ScrollView  } from 'react-native';
import firestore, { doc } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { styles } from '../styleCss/styles';
import { stylesModal } from '../styleCss/stylesModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const [product_book, setProduct] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);  
  const navigation: any = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false); //Pop up ยังไม่ได้เรียกใช้ ให้เป็น False
  const [DetailBook, setSelectedBook] = useState<any>(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const querySnapshot = await firestore().collection('product_book').get();
        const productsData = querySnapshot.docs.map(doc => ({ 
          ...doc.data(), book_id: doc.id }));
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

  const handleTodetail = (item : any) => {
    // Alert.alert("ID หนังสือ : " + bookId.toString());
    // navigation.navigate('Book_detail', { item : item });
    setSelectedBook(item); 
    setModalVisible(true); //เมื่อกดแล้วให้เปลี่ยนสถานะเป็น true เพื่อเปิด PopUp
  };

  const onCloseModal = () => {
    setModalVisible(!isModalVisible); //เปลี่ยนให้เป็น False เพื่อปิด
  };

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
        horizontal
        renderItem={({ item }) => (
            <View style={styles.productContainer}>
            <View style = {styles.thumbnailContainer}>
              <TouchableOpacity onPress={() => handleTodetail(item)}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail}/>
              </TouchableOpacity>
            </View>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text> 
                <Text style = {styles.author}>{item.authors}</Text>
              <View style = {styles.box_price}>
                <Text style={styles.price}>฿ {item.price}</Text>
              </View>
              
          </View>
          )}
          showsHorizontalScrollIndicator={false}
        /> 
    </View>
          
          <Modal isVisible={isModalVisible}>
            <TouchableOpacity onPress={onCloseModal}>
                <Text style = {{
                  color : "white",
                  fontSize : 18,
                  textAlign : "right"
                }}>X</Text>
             </TouchableOpacity>
              <ScrollView>
              <View style = {stylesModal.Modalcontainer}>
                {DetailBook && (
                  <>
                  <View style = {stylesModal.thumbnailModalContainer}>
                    <Image
                    source={{ uri : DetailBook.thumbnail}}
                    style = {stylesModal.thumbnailModal}
                    />
                    <Text style = {stylesModal.titleModal}>{DetailBook.title}</Text>
                    <Text style = {stylesModal.authorModal}>By : {DetailBook.authors}</Text>
                  </View>

                  <View style = {stylesModal.Containerbtn}>
                      <TouchableOpacity style = {stylesModal.btnBuyModal}>
                        <Text style = {stylesModal.textbtnBuyModal}>ซื้อ {DetailBook.price} บาท</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style = {stylesModal.btnBookMarks}>
                        <Text style = {stylesModal.textbtnBuyModal}>Bookmarks +</Text>
                      </TouchableOpacity>
                  </View>

                  <View>
                  <Text style = {{
                    fontSize : 18,
                    marginTop : 10,
                    color : "white",
                    fontWeight : "bold",
                    }}>เรื่องย่อ</Text>
                    <Text style = {stylesModal.descrtiptionModal}>{DetailBook.description}</Text>
                  </View>
                  </>
                )}
              </View>
              
              </ScrollView>
          </Modal>
  </>
  
  )
}







export default Home