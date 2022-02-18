import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBnqIOuAhLQWVEBtaTU5jvFFJkePaROKlg",
  authDomain: "image-uploader-27f98.firebaseapp.com",
  projectId: "image-uploader-27f98",
  storageBucket: "image-uploader-27f98.appspot.com",
  messagingSenderId: "971234382957",
  appId: "1:971234382957:web:3e63dd90aba2a381ce1b64",
  measurementId: "G-1J2C4L0PG6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage=firebase.storage();

export {storage};