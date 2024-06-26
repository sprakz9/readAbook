import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBt2B6n8ErcILv2NBt-guCiUQmQZv3IieU",
  authDomain: "readabook-8c53f",
  projectId: "readabook-8c53f",
  storageBucket: "readabook-8c53f.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:115882026764:android:e034895c8d41e2f7100b29"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase};
