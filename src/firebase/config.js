// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

import {getStorage} from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVVpP-ExHJDi0GEGbDpVVCTpZavOzU1Vg",
  authDomain: "twitter-clone-945d5.firebaseapp.com",
  projectId: "twitter-clone-945d5",
  storageBucket: "twitter-clone-945d5.appspot.com",
  messagingSenderId: "927466095795",
  appId: "1:927466095795:web:c744278a0456cbef491cc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app)

// google provider
export const provider = new GoogleAuthProvider()

// database reference
export const db = getFirestore(app)

// storage refrence
export const storage = getStorage(app)