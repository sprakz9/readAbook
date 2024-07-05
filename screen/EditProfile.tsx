import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfile = () => {
  const navigation: any = useNavigation();
  const [userData, setUserData] = useState({ username: "", email: "" , tel : "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc : any = await firestore().collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      try {
        await firestore().collection('users').doc(currentUser.uid).update(userData);
        Alert.alert('Profile updated successfully!');
        navigation.navigate("Profile")
      } catch (error) {
        console.error('Error updating profile: ', error);
        Alert.alert('Error', 'An error occurred while updating your profile.');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username <Icon name = "person-circle-outline" color={"green"} size={18}/></Text>
      <TextInput
        style={styles.input}
        value={userData.username}
        onChangeText={(text) => setUserData({ ...userData, username: text })}
      />
      <Text style={styles.label}>Email <Icon name = "mail-outline" color={"green"} size={18}/></Text>
      <TextInput
        style={styles.input}
        value={userData.email}
        onChangeText={(text) => setUserData({ ...userData, email: text })}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Telephone <Icon name = "call-outline" color={"green"} size={18}/></Text>
      <TextInput
        style={styles.input}
        value={userData.tel}
        onChangeText={(text) => setUserData({ ...userData, tel: text })}
        keyboardType="numeric"
      />

      <TouchableHighlight style = {styles.button} onPress={handleUpdateProfile}>
        <Text style = {styles.buttonText}>Update Profile</Text>
      </TouchableHighlight>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color : "#00bf6c"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#00bf6c',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
