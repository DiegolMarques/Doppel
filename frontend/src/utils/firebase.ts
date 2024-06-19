// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUN77D8o3lnvdeyov8ako7k49d3Q6R8JE",
  authDomain: "doppel-cf35d.firebaseapp.com",
  projectId: "doppel-cf35d",
  storageBucket: "doppel-cf35d.appspot.com",
  messagingSenderId: "47942211448",
  appId: "1:47942211448:web:a95dca363b7fbc2e311a8d",
  measurementId: "G-82LQ49BLG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);