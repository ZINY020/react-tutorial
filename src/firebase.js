// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEsyC0FDNSCFWeG7GQGzFWKMpVPwAmKpI",
  authDomain: "react-tutorial-24bb4.firebaseapp.com",
  projectId: "react-tutorial-24bb4",
  storageBucket: "react-tutorial-24bb4.appspot.com",
  messagingSenderId: "596671924013",
  appId: "1:596671924013:web:bceeb3c2ac1a5859c775a4",
  measurementId: "G-QTBPCTLKDX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
