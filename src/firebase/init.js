
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmxpAh0h7t_Fci3Dr4MA5vTceLpJwWZiw",
  authDomain: "drey-ee2d0.firebaseapp.com",
  projectId: "drey-ee2d0",
  storageBucket: "drey-ee2d0.appspot.com",
  messagingSenderId: "950125841857",
  appId: "1:950125841857:web:35bfdffd35c9fd9660f340"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;