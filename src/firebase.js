import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage';

const config={
    apiKey: "AIzaSyCnrTygeKObbWGaP2sAVFrXQUYrM7pU1VM",
    authDomain: "chat-mid-4.firebaseapp.com",
    projectId: "chat-mid-4",
    storageBucket: "chat-mid-4.appspot.com",
    messagingSenderId: "756820019793",
    appId: "1:756820019793:web:c3fa01fffd29b3d3aa4670",
    measurementId: "G-C80MS5F4MX"
}

if(firebase.apps.length===0)
{
    firebase.initializeApp(config);
}


//


export const auth=firebase.auth();
export const firestore=firebase.firestore();
export const googleProvider=new firebase.auth.GoogleAuthProvider();
export const ServerTimestamp=firebase.firestore.FieldValue.serverTimestamp;
export const Storage = firebase.storage();