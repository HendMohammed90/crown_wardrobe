// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , signInWithPopup, GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import {doc ,setDoc, getDoc, getFirestore} from "firebase/firestore"
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


// Initialize Firestore(database)
export const db = getFirestore();

// create User Document From Auth on the database
export const createUserDocFromAuth = async(userAuth: UserCredential , additionalInformation = {})=>{
  const userDocRef = doc(db , 'users' , userAuth.user.uid)
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);


  if(!userSnapshot.exists()){

    const displayName = userAuth.user.displayName; 
    const email = userAuth.user.email; 
    const createdAt = new Date();
    try {
      const setDocResult = await setDoc(userDocRef , {
        displayName: displayName || null,
        email: email || null,
        createdAt: createdAt,
        ...additionalInformation
      })
      console.log(`setDocResult is ${JSON.stringify(setDocResult)}`)
    } catch (error) {
      console.log(`Error of creating a user on Database ${error}`)
    }
  }

  return userSnapshot;
} 

// Function to create user from email and password
export const createAuthUserWithEmailAndPassword = async (email: string , password : string) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
}

// Function to signIn user from email and password

export const signInWithEmailAndPasswordFun = async (email: string , password : string) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword( auth , email , password);
}
