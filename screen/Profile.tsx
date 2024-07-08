import React, { useState, useEffect , useCallback  } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Button , 
  ScrollView , 
  Alert , 
  Image , 
  ImageBackground, 
  TouchableOpacity, 
  RefreshControl,
} from 'react-native';
import firebase from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { BlurView } from "@react-native-community/blur";
import Icon from 'react-native-vector-icons/Ionicons';




const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchProfile = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userDocRef = firestore().collection('users').doc(userId);

      try {
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          setProfile(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching profile: ', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  
  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>No profile data available</Text>
      </View>
    );
  }

  const EditProfilePage = () => {
    navigation.navigate("EditProfile")
  }

  const EditPassword = () => {
    navigation.navigate("EditPassWord")
  }

  const Myorder = () => {
    Alert.alert("ประวัติการซื้อ")
  }

  const BuyCoin = () => {
    navigation.navigate("BuyCoinPage")
  }

  const LogOut = () => {
    Alert.alert(
      'ยืนยันการออกจากระบบ',
      'ต้องการออกจากระบบใช่ไหม ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress : async () => {
            try {
              await auth().signOut();
                navigation.navigate('Login');
            } catch (error) {
              console.error('Error signing out: ', error);
              Alert.alert('Error', 'An error occurred while signing out.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.container}>
      <ImageBackground
        source={{ uri : profile.imgPro }}
        style={styles.background}
        resizeMode="cover"
      >
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.posterContainer}>
          <Image
            source={{ uri : profile.imgPro }}
            style={styles.poster}
          />
        </View>
        
        <View style={[styles.infoContainer]}>
          <Text style={styles.username}>{profile.username}</Text>

          <View style = {styles.dataModalContainer}>
            <Text style = {styles.dataModalTopic}><Icon name = "mail-outline" color={"white"} size={15}/> Email</Text>
            <Text style = {styles.dataModal}>{profile.email}</Text>
          </View>

          

          <View style = {styles.dataModalContainer}>
            <Text style = {styles.dataModalTopic}><Icon name = "call-outline" color={"white"} size={15}/> Telephone</Text>
            <Text style = {styles.dataModal}>{profile.tel}</Text>
          </View>

          <View style = {styles.dataModalContainer}>
            <Text style = {styles.dataModalTopic}>
              <Icon name = "person-circle-outline" color={"white"} size={15}/> User-id
            </Text>
          <Text style = {styles.dataModal}>{profile.userID}</Text>
          </View>

          <View style = {styles.dataModalContainer}>
            <Text style = {styles.dataModalTopic}>
              <Icon name = "wallet-outline" color={"white"} size={15}/> Coin
            </Text>
          <Text style = {[styles.dataModal , {color : "gold"}]}>{profile.readAbook_coin} Coin</Text>
          </View>

          {/* <View style={styles.line}></View> */}

          
            <TouchableOpacity style = {styles.btn_edit_profile} onPress={EditProfilePage}>
              <Text style = {styles.btn_text_edit_profile}>แก้ไขข้อมูลส่วนตัว</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.btn_edit_profile} onPress={EditPassword}>
              <Text style = {styles.btn_text_edit_profile}>เปลี่ยนพาสเวิร์ด</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.btn_edit_profile} onPress={LogOut}>
              <Text style = {styles.btn_text_edit_profile}>ออกจากระบบ</Text>
            </TouchableOpacity>

            <Text style = {styles.text_for_topic}>ข้อมูลของฉัน</Text>

            <TouchableOpacity style = {styles.btn_edit_profile} onPress={Myorder}>
              <Text style = {styles.btn_text_edit_profile}>ประวัติการซื้อของฉัน</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.btn_edit_profile} onPress={BuyCoin}>
              <Text style = {styles.btn_text_edit_profile}>เติมคอยด์</Text>
            </TouchableOpacity>
          

        </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  posterContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  infoContainer: {
    // alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: 2,
    padding: 10,
    height : 550
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign : "center",
    marginBottom : 35,
    marginTop : 10,
  },
  subtitle: {
    color: 'white',
  },
  fontColor: {
    color: 'white',
    fontSize : 18 ,
    textAlign : "center"
  } , 
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dataModalContainer : {
    flexDirection : "row",
    justifyContent : "space-between",
    marginHorizontal : 10
  },
  dataModal : {
    color : "white",
    fontSize : 14,
    marginTop : 6
  },
  dataModalTopic : {
    color : "white",
    fontSize : 18,
    marginTop : 6,
    fontWeight : "bold"
  },
  line: {
    height: 2,
    backgroundColor: 'gray',
    margin: 10,
  },
  btn_text_edit_profile : {
    color : "white",
    marginHorizontal : 10,
    fontSize : 15,
  },
  btn_edit_profile: {
    marginTop : 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 2,
    borderWidth: 0.5,
    // width : 500,
    borderColor: 'gray', // สีของกรอบ
  },
  text_for_topic : {
    fontWeight : "bold",
    backgroundColor : "gray",
    marginTop : 8,
    height : 50,
    paddingVertical: 15.5,
    paddingHorizontal: 18,
  },
});

export default Profile