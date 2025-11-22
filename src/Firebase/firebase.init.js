// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7r_f1wbYOErKlXlY-goPXBDkw4HHwGxg",
  authDomain: "simple-firebase-auth-144dc.firebaseapp.com",
  projectId: "simple-firebase-auth-144dc",
  storageBucket: "simple-firebase-auth-144dc.firebasestorage.app",
  messagingSenderId: "547882147217",
  appId: "1:547882147217:web:d1aa5926abcdb6a9b20e30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);