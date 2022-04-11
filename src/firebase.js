// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCZ1pC52YmroLTXJWbRsqlphjwrH4R7gs",
    authDomain: "sparta-react-baisc-e0baa.firebaseapp.com",
    projectId: "sparta-react-baisc-e0baa",
    storageBucket: "sparta-react-baisc-e0baa.appspot.com",
    messagingSenderId: "646877973043",
    appId: "1:646877973043:web:62b34430f3d591f1c73146",
    measurementId: "G-HGQCF7DRBZ"
};



initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);



export const db = getFirestore();
