// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkciPs5dzDGQjWzGcKCHbuiacf7u2db2Y",
  authDomain: "react-project-8462a.firebaseapp.com",
  projectId: "react-project-8462a",
  storageBucket: "react-project-8462a.appspot.com",
  messagingSenderId: "493888081681",
  appId: "1:493888081681:web:b1b81259a02d529f3706b0",
  measurementId: "G-2JG2YW0R63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage();
const storageRef = ref(storage);

const auth = getAuth(app)

const db = getFirestore(app)

export { app, auth, db, storage, storageRef }