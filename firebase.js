// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPycQrDC4z0ABJKDJs19Y7el4Voi5Kbl0",
  authDomain: "banking-system-3c21a.firebaseapp.com",
  projectId: "banking-system-3c21a",
  storageBucket: "banking-system-3c21a.appspot.com",
  messagingSenderId: "37016798196",
  appId: "1:37016798196:web:a6201592c84c9cde7a6fa1",
  measurementId: "G-QDEN9KGD2H"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, doc, setDoc,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,fetchSignInMethodsForEmail };