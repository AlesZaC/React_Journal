import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCuSQpzJ_WubwYVrM5xeDYIr1mGR-hMFxA",
    authDomain: "react-app-3a630.firebaseapp.com",
    projectId: "react-app-3a630",
    storageBucket: "react-app-3a630.appspot.com",
    messagingSenderId: "406247273909",
    appId: "1:406247273909:web:c5310c181afd581287d5fc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase

}