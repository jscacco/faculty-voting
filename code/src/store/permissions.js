import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC6IvTrHvamb83DUmxCJQCOIJCsQHce4wA",
  authDomain: "faculty-voting-9ad15.firebaseapp.com",
  databaseURL: "https://faculty-voting-9ad15.firebaseio.com",
  projectId: "faculty-voting-9ad15",
  storageBucket: "faculty-voting-9ad15.appspot.com",
  messagingSenderId: "627933747870",
  appId: "1:627933747870:web:348d54dac28eab6f84b98f",
  measurementId: "G-VB13V4GH27"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export default firestore; 