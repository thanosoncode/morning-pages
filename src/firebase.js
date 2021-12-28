// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBlRTeo4fMMEKdvkdE25FTK5bLax8aUKZ8",
//   authDomain: "morning-pages-2-2b8fc.firebaseapp.com",
//   projectId: "morning-pages-2-2b8fc",
//   storageBucket: "morning-pages-2-2b8fc.appspot.com",
//   messagingSenderId: "103422637972",
//   appId: "1:103422637972:web:970779f04741c332c2c181",
//   measurementId: "G-DEL7FJWELW",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// export const db = getFirestore(app);

//analytics
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDi-_jC7TUftm4jUfoo_c5oXbo5zApvyiI",
  authDomain: "morning-pages-analytics.firebaseapp.com",
  projectId: "morning-pages-analytics",
  storageBucket: "morning-pages-analytics.appspot.com",
  messagingSenderId: "282740742123",
  appId: "1:282740742123:web:788764e5451eb61acdebae",
  measurementId: "G-TRDG1KQRQ8",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
