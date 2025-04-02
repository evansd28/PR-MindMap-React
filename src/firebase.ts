// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI64BIkmYqEH8oVTC_UlzWyIU_xyj9ky8",
  authDomain: "pr-mindmap-react.firebaseapp.com",
  projectId: "pr-mindmap-react",
  storageBucket: "pr-mindmap-react.firebasestorage.app",
  messagingSenderId: "893878757306",
  appId: "1:893878757306:web:5eba462c28e0744df19f83",
  measurementId: "G-1Y5R41D96B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);