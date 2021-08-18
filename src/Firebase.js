import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUO13vSQYzZQ6LVndyRdIFTzX6UhU6SDg",
    authDomain: "whatssap-clone-26741.firebaseapp.com",
    projectId: "whatssap-clone-26741",
    storageBucket: "whatssap-clone-26741.appspot.com",
    messagingSenderId: "843451611522",
    appId: "1:843451611522:web:51ffeab8007c062a7b379b",
    measurementId: "G-X84G9HM9L5"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth, provider};
  export default db;