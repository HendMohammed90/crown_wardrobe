// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import {
  doc, setDoc, getDoc, getFirestore, collection,
  writeBatch, query, getDocs,
} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0AU4gAZ0xKEh7tDGmPM4cl4npleF4taQ",
  authDomain: "crown-wardrobe-db.firebaseapp.com",
  projectId: "crown-wardrobe-db",
  storageBucket: "crown-wardrobe-db.appspot.com",
  messagingSenderId: "942804660202",
  appId: "1:942804660202:web:8291cedfcd27070dbbcc93"
};
import { CategoryType, Item } from "../types"

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Authorization
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


// Initialize Firestore(database)
export const db = getFirestore();

// Function to be used in adding CollectionAndDocuments to firestore as database.
// Used Frequently once [one time] if we have data and need to add them to the firestore as database.
// This approach not the best way if we deal with large projects
export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: CategoryType[]
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object: CategoryType) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

// Function to retrieve Categories And Documents from firestore.
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'Documents');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce<{ [key: string]: Item[] }>((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// create User Document From Auth on the database
export const createUserDocFromAuth = async (user: User | UserCredential, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', 'uid' in user ? user.uid : user.user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const displayName = 'displayName' in user ? user.displayName : user.user.displayName;
    const email = 'email' in user ? user.email : user.user.email;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName: displayName || null,
        email: email || null,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log(`Error creating user in Database: ${error}`);
    }
  }

  return userSnapshot;
}

// Function to create User Document from email and password
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

// Function to signIn user from email and password
export const signInWithEmailAndPasswordFun = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}


// Function to signOut
export const signOutUser = async () => await signOut(auth);

// function to Adds an observer for changes to the user's sign-in state.
export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
}