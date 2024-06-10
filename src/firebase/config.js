import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  apiKey: "AIzaSyBmYkIej6ZC7JHdRI2-tVQAxm0s2sbpeLg",
  authDomain: "dryharvesthub.firebaseapp.com",
  projectId: "dryharvesthub",
  storageBucket: "dryharvesthub.appspot.com",
  messagingSenderId: "302030329816",
  appId: "1:302030329816:web:197b9ecaac693a1fe6c4ad",
  measurementId: "G-S0T8LR37HR",
};

const app = initializeApp(config);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// const auth = getAuth(app);

export { db, auth };
