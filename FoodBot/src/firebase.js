// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAupPVJeNo_g9_jCW07YUsRJYCKOE1lIVw",
  authDomain: "taskmanagement-70a66.firebaseapp.com",
  projectId: "taskmanagement-70a66",
  storageBucket: "taskmanagement-70a66.appspot.com",
  messagingSenderId: "1007642811120",
  appId: "1:1007642811120:web:49eba30ea2aa54cfa3c035",
  measurementId: "G-H139T6J9YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export {auth};