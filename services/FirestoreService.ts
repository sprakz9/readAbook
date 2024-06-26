import  firebase  from '@react-native-firebase/app';

const firestore = firebase.firestore();

export const getFavoriteBooks = async (userID: string) => {
    try {
      const userDoc = await firestore.collection('users').doc(userID).get();
      const favoriteBooks = userDoc.data()?.FavoritesCollection || {};
      return favoriteBooks;
    } catch (error) {
      throw error;
    }
  };

  export const addFavoriteBook = async (userID: string, book_id: string) => {
    try {
      const userRef = firestore.collection('users').doc(userID);
      await userRef.update({
        [`FavoritesCollection.${book_id}`]: true
      });
    } catch (error) {
      throw error;
    }
  };
