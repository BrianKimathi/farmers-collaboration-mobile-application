import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCD9a_HXONfDtiY0dgHsIO4oHROBou4crA",
  authDomain: "files-upload-11998.firebaseapp.com",
  projectId: "files-upload-11998",
  storageBucket: "files-upload-11998.appspot.com",
  messagingSenderId: "73379813618",
  appId: "1:73379813618:web:3a491faefc1d355960d86b",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
