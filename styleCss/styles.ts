import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDCDCD',
      padding: 20,
    },
    thumbnail: {
      width: 120,
      height: 170,
      resizeMode: 'cover',
      marginLeft : 3 , 
      marginTop : 4
    },
    thumbnailContainer : {
      alignItems: 'center',
      marginRight : 3,
      marginTop : 1
    },
    productContainer: {
      flex: 1,
      marginBottom: 20,
      borderRadius : 8,
      borderWidth : 0.5,
      margin : 1,
      position: 'relative',
      overflow : "hidden",
      height: 260, 
      width : 130,
      marginHorizontal: 5,
      backgroundColor : "black"
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color : "white",
      textAlign : "left",
      paddingHorizontal: 5,
      marginTop : 2
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
      paddingHorizontal : 5,
      color : "gray"
    },
    headerText : {
      fontSize: 18,
      fontWeight: 'bold',
      margin: 10,
      color : "black"
    },
    topHeader_Text : {
      fontSize : 20,
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
  });