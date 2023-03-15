import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAXQv7tmEMAsIcuqSEPcXoq_l2mFSFN3M8",
    authDomain: "app-movie-watching.firebaseapp.com",
    projectId: "app-movie-watching",
    storageBucket: "app-movie-watching.appspot.com",
    messagingSenderId: "550619091690",
    appId: "1:550619091690:web:068cbdb0422d3ad7dd7d93",
    measurementId: "G-4BQ7L6J45J"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };