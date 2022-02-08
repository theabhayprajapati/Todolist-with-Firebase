// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDo6baW19mEnnNRI0WcSkix-0TsR-wGG4Q",
    authDomain: "fir-todolist-26772.firebaseapp.com",
    projectId: "fir-todolist-26772",
    storageBucket: "fir-todolist-26772.appspot.com",
    messagingSenderId: "50989509543",
    appId: "1:50989509543:web:90353e095c40707fd7e482"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()