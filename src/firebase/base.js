import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCOGzn37DcUSmXyDAB7W9EK6yJTbNkIj7g',
  authDomain: 'moviesta-z.firebaseapp.com',
  databaseURL: 'https://moviesta-z.firebaseio.com',
  projectId: 'moviesta-z',
  storageBucket: 'moviesta-z.appspot.com',
  messagingSenderId: '471207436083'
};

export const fire = firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
export const rootRef = firebase.database().ref();
export const usersRef = rootRef.child('users');
export { firestore };