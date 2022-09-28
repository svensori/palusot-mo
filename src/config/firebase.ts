import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyB5I91iiCrFv3E0Os5nuFlFc4XbL0W-z8I",
  authDomain: "palusot-mo.firebaseapp.com",
  databaseURL: "https://palusot-mo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "palusot-mo",
  storageBucket: "palusot-mo.appspot.com",
  messagingSenderId: "941073182529",
  appId: "1:941073182529:web:ed97bb2e2e431a12cebbc0"
};

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp);