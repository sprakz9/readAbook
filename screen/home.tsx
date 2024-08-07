import React, { useState, useEffect , useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList , 
  Image , 
  TouchableOpacity, 
  Alert, 
  Button, 
  ScrollView , 
  ActivityIndicator,
  StatusBar ,
  RefreshControl
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { styles } from '../styleCss/styles';
import { stylesModal } from '../styleCss/stylesModal';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';



const Home = () => {
  const [product_book, setProduct] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);  
  const navigation: any = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false); //Pop up ยังไม่ได้เรียกใช้ ให้เป็น False
  const [DetailBook, setSelectedBook] = useState<any>(null);
  const [userCoins, setUserCoins] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await firestore().collection('product_book').get();
      const productsData = querySnapshot.docs.map(doc => ({ 
        ...doc.data(),
        book_id: doc.id,
        publishedDate: doc.data().publishedDate.toDate(),
      }));
      setProduct(productsData);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const userData : any = userDoc.data();
          setUserCoins(userData.readAbook_coin);
        }
      }
    } catch (error) {
      console.error('Error fetching products: ', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
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

  const formatDate = (date : any) => {
    return dayjs(date).format('DD MMMM YYYY'); // รูปแบบวันที่ที่คุณต้องการ
  };

  const addFavBook = async () => {
    const currentUser = firebase.auth().currentUser; //ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่ในปัจจุบัน
    if (currentUser && DetailBook) {
      const userId = currentUser.uid;
      const bookId = DetailBook.book_id; // ID ของหนังสือที่เลือก

      try {
        const userDocRef = firestore().collection('users').doc(userId);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          const userData : any = userDoc.data();
          if (userData.FavMyBook) {
            // ถ้ามีฟิลด์ FavMyBook อยู่แล้ว
            await userDocRef.update({
              FavMyBook: firestore.FieldValue.arrayUnion(bookId)
            });
          } else {
            // ถ้าไม่มีฟิลด์ FavMyBook
            await userDocRef.set({
              FavMyBook: [bookId]
            }, { merge: true });
          }
        } else {
          // ถ้าเอกสารผู้ใช้ไม่มีอยู่
          await userDocRef.set({
            FavMyBook: [bookId]
          });
        }
        Alert.alert('Added to Favorites');
      } catch (error) {
        console.error('Error adding to favorites: ', error);
        Alert.alert('Error adding to favorites');
      } finally {
      }
    }
  };

  const buyBookfunc = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser && DetailBook) {
      const userId = currentUser.uid;
      const PurchasedBook = DetailBook.book_id;
      const bookPrice = DetailBook.price;

      try {
        const userDocRef = firestore().collection('users').doc(userId);
        const userDoc = await userDocRef.get();

        
        if (userDoc.exists) {
          const userData : any = userDoc.data();
          const purchasedBooks = userData.PurchasedBook || [];

          if (purchasedBooks.includes(PurchasedBook)) {
            Alert.alert("คุณมีหนังสือเล่มนี้อยู่แล้ว");
            return;
          }
          
          //ขั้นตอนเช็ค coin
          if (userData.readAbook_coin >= bookPrice) {
            await userDocRef.update({
              readAbook_coin: userData.readAbook_coin - bookPrice,
              PurchasedBook: firestore.FieldValue.arrayUnion(PurchasedBook),
            });

            Alert.alert("ซื้อหนังสือสำเร็จ");
            setUserCoins(userData.readAbook_coin - bookPrice);
          } else {
            Alert.alert("เหรียญไม่เพียงพอ กรุณาเติมเหรียญ");
          }
        }
      } catch (error) {
        console.error('Error purchasing book: ', error);
        Alert.alert('Error', 'An error occurred while purchasing the book.');
      }
    }
  };

  return (
    <>
    <StatusBar backgroundColor="#00bf6c" barStyle="light-content"/>
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
                <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text> 
                <Text style = {styles.author} numberOfLines={1} ellipsizeMode='tail'>{item.authors}</Text>
              <View style = {styles.box_price}>
                <Text style={styles.price}>฿ {item.price}</Text>
              </View>
          </View>
          )}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        /> 
    </View>
          
          <Modal isVisible={isModalVisible}>
            
              <ScrollView>
              <View style = {stylesModal.Modalcontainer}>
              <TouchableOpacity onPress={onCloseModal}>
                <Text style = {stylesModal.bthClosePopUp}>X</Text>
             </TouchableOpacity>
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
                      <TouchableOpacity style = {stylesModal.btnBuyModal} onPress={buyBookfunc}>
                        <Text style = {stylesModal.textbtnBuyModal}>ซื้อ {DetailBook.price} บาท</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style = {stylesModal.btnBookMarks} onPress={addFavBook}>
                        <Text style = {stylesModal.textbtnBuyModal}>Bookmarks</Text>
                      </TouchableOpacity>
                  </View>

                  <View>
                    <Text style = {stylesModal.descrtiptionModal}>{DetailBook.description}</Text>
                  </View>

                 <View style = {stylesModal.space}></View>

                    <View style = {stylesModal.dataModalContainer}>
                      <Text style = {stylesModal.dataModal}>ซีรี่ส์</Text>
                      <Text style = {stylesModal.dataModal}>{DetailBook.mainName}</Text>
                    </View>

                    <View style = {stylesModal.dataModalContainer}>
                      <Text style = {stylesModal.dataModal}>วันที่วางขาย</Text>
                      <Text style = {stylesModal.dataModal}>{formatDate(DetailBook.publishedDate)}</Text>
                    </View>

                    <View style = {stylesModal.dataModalContainer}>
                      <Text style = {stylesModal.dataModal}>จำนวนหน้า</Text>
                      <Text style = {stylesModal.dataModal}>{DetailBook.pageCount} หน้า</Text>
                    </View>

                    <View style = {stylesModal.dataModalContainer}>
                      <Text style = {stylesModal.dataModal}>ราคา</Text>
                      <Text style = {stylesModal.dataModal}>{DetailBook.price} บาท</Text>
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