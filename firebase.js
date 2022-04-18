// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs7CjAvmsR48wQA-Pxl_1GpeQ6Wa664OA",
  authDomain: "instagram-clone-22151.firebaseapp.com",
  projectId: "instagram-clone-22151",
  storageBucket: "instagram-clone-22151.appspot.com",
  messagingSenderId: "495059335076",
  appId: "1:495059335076:web:b68fb0bd9c438eb7307331",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export { db, app, storage };
