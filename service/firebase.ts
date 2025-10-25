// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhld2bhpRIi1uzj87qs59y6HJupaBAMJw",
  authDomain: "livraria-13ba3.firebaseapp.com",
  projectId: "livraria-13ba3",
  storageBucket: "livraria-13ba3.firebasestorage.app",
  messagingSenderId: "380008534185",
  appId: "1:380008534185:web:45e3e881b1072b90a159b8",
  measurementId: "G-MN76HQW296",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
