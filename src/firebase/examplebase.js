import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: YOUR_APP_KEY,
  authDomain: YOUR_authDomain,
  databaseURL: YOUR_databaseURL,
  projectId: YOUR_projectId,
  storageBucket: YOUR_storageBucket,
  messagingSenderId: YOUR_messagingSenderId
};

export const fire = firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
export const rootRef = firebase.database().ref();
export const usersRef = rootRef.child('users');
export { firestore };