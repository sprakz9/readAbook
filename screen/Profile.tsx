import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
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
        }
      }
    };

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

  const EditProfile = () => {
    Alert.alert("เดี๋ยวค่อยทำน้า")
  }

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    //   {/* <Image
    //   style = {styles.imgProfile}
    //   source={{uri : profile.imgPro}}
    //   />
    //   <Text style={styles.label}>ชื่อผู้ใช้:</Text>
    //   <Text style={styles.value}>{profile.username}</Text>
      
    //   <Text style={styles.label}>อีเมล:</Text>
    //   <Text style={styles.value}>{profile.email}</Text>
      
    //   <Text style={styles.label}>การล็อกอินครั้งล่าสุด:</Text>
    //   <Text style={styles.value}>{profile.lastLogin?.toDate().toString()}</Text>
      
    //   <Button title="แก้ไขโปรไฟล์" onPress={() => EditProfile()} /> */}
    // </ScrollView>

    <ScrollView>
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
              <Icon name = "person-outline" color={"white"} size={15}/> User-id
            </Text>
          <Text style = {styles.dataModal}>{profile.userID}</Text>
          </View>

          {/* <View style={styles.line}></View> */}

          <View>
            <TouchableOpacity style = {styles.btn_edit_profile}>
              <Text style = {styles.btn_text_edit_profile}>แก้ไขข้อมูลส่วนตัว</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.btn_edit_profile}>
              <Text style = {styles.btn_text_edit_profile}>xx</Text>
            </TouchableOpacity>
          </View>

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
    height : 500
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
    color : "White",
    marginHorizontal : 10,
    fontSize : 15,
  },
  btn_edit_profile: {
    marginTop : 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 2,
    borderWidth: 1,
    width : 500,
    borderColor: 'gray', // สีของกรอบ
  },
});

export default Profile