import {getReactNativePersistance, initializeAuth} from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPFqEvlCHID2uhGaltexMLc8q7aNa6I6U",
  authDomain: "intermediait-challenge.firebaseapp.com",
  projectId: "intermediait-challenge",
  storageBucket: "intermediait-challenge.appspot.com",
  messagingSenderId: "719292968033",
  appId: "1:719292968033:web:787bac1c37bcd61365ce20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence: getReactNativePersistance(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db, 'users')