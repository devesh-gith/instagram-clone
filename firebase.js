// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8q6Hii6he5-ZQyHGcbaRTdD2yUmfWyH8",
  authDomain: "insta-clone-350818.firebaseapp.com",
  projectId: "insta-clone-350818",
  storageBucket: "insta-clone-350818.appspot.com",
  messagingSenderId: "1033141223552",
  appId: "1:1033141223552:web:45dc850190f96ef562e665",
  measurementId: "G-JGEERQE57E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { db, app, storage };
