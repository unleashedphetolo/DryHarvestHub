import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmYkIej6ZC7JHdRI2-tVQAxm0s2sbpeLg",
  authDomain: "dryharvesthub.firebaseapp.com",
  projectId: "dryharvesthub",
  storageBucket: "dryharvesthub.appspot.com",
  messagingSenderId: "302030329816",
  appId: "1:302030329816:web:197b9ecaac693a1fe6c4ad",
  measurementId: "G-S0T8LR37HR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
