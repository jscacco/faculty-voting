import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDaCpivpkrEsgojfsfvlfv4zAWL72KNwvg",
    authDomain: "test-2eb62.firebaseapp.com",
    databaseURL: "https://test-2eb62.firebaseio.com",
    projectId: "test-2eb62",
    storageBucket: "test-2eb62.appspot.com",
    messagingSenderId: "763543057212",
    appId: "1:763543057212:web:3fd403b9489982631da439",
    measurementId: "G-SMXGC7DK5X"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase