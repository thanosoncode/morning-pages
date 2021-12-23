import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlRTeo4fMMEKdvkdE25FTK5bLax8aUKZ8",
  authDomain: "morning-pages-2-2b8fc.firebaseapp.com",
  projectId: "morning-pages-2-2b8fc",
  storageBucket: "morning-pages-2-2b8fc.appspot.com",
  messagingSenderId: "103422637972",
  appId: "1:103422637972:web:970779f04741c332c2c181",
  measurementId: "G-DEL7FJWELW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
