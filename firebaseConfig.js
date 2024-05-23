//@ts-ignore - Using "ts-ignore" because this issue https://github.com/firebase/firebase-js-sdk/issues/7584#issuecomment-1785705367
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js'

import { initializeAuth } from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore, collection } from 'firebase/firestore'
import {FIREBASE_API_KEY} from '@env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: 'intermediait-challenge.firebaseapp.com',
    projectId: 'intermediait-challenge',
    storageBucket: 'intermediait-challenge.appspot.com',
    messagingSenderId: '719292968033',
    appId: '1:719292968033:web:787bac1c37bcd61365ce20',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const usersRef = collection(db, 'users')
