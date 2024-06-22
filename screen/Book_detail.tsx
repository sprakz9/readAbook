// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { useRoute } from '@react-navigation/native';


// type ParamList = {
//   thumbnail: string;
//   price: number;
//   title: string;
//   authors: string;
//   description: string;
//   book_id: string;
//   publishedDate : string;
//   pageCount : string;
// }

// const Book_detail = () => {
//   const route = useRoute();
//   const { item } = route.params as {item : ParamList} // ดึงข้อมูลจาก Home
//   return (
//     <View style = {styles.container}>
//       <View style = {styles.thumbnailContainer}>
//         <Image
//           source={{ uri : item.thumbnail}} style = {styles.thumbnail}
//         />
//       </View>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     padding: 20,
//   },
//   thumbnail : {
//     width : 180,
//     height : 250,
//   },
//   thumbnailContainer : {
//     alignItems : "center"
//   }
// })

// export default Book_detail