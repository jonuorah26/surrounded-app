// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "@firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getMessaging } from "firebase/messaging";
import { getDatabase } from "firebase/database";
import Constants from "expo-constants";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  databaseURL: Constants.expoConfig?.extra?.FIREBASE_DATABASE_URL,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//const analytics = getAnalytics(app);

const db = getFirestore(app);
const rtDb = getDatabase(app);
//const messaging = getMessaging(app);

export { /*auth,*/ db, rtDb };
