// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// VERY IMPORTANT
// Add all your data and rename this file to: forebaseConnection.js

const firebaseConfig = {
    apiKey: "", // Your ApiKey
    authDomain: "", // Your AuthDomain
    projectId: "",  // Your ProjectId
    storageBucket: "",  // Your StorageBucket
    messagingSenderId: "", // Your messagingSenderId
    appId: "", // Your appId
    measurementId: "" // Your measurementId
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth };

