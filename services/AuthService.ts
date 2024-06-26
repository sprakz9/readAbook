import  firebase  from '@react-native-firebase/app';
import '@react-native-firebase/auth';

const auth = firebase.auth();

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};
