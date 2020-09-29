import firebase from 'firebase'
import 'firebase/firestore'

/*var firebaseConfig = {
    apiKey: "AIzaSyAi8wFKiOa7KOz-I7Tm3WRLcHWxHyMFy1Y",
    authDomain: "alpha-2317a.firebaseapp.com",
    databaseURL: "https://alpha-2317a.firebaseio.com",
    projectId: "alpha-2317a",
    storageBucket: "alpha-2317a.appspot.com",
    messagingSenderId: "543071750635",
    appId: "1:543071750635:web:de14fb9be82dd8b7fa71ae",
    measurementId: "G-XCJ10FG97G"
  };
  */

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

export default firebase