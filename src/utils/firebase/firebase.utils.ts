// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0AU4gAZ0xKEh7tDGmPM4cl4npleF4taQ",
  authDomain: "crown-wardrobe-db.firebaseapp.com",
  projectId: "crown-wardrobe-db",
  storageBucket: "crown-wardrobe-db.appspot.com",
  messagingSenderId: "942804660202",
  appId: "1:942804660202:web:8291cedfcd27070dbbcc93"
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Authorization
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt : 'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider) ;
