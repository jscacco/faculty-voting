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
    apiKey: "AIzaSyAYAdgWYuEmNnV5LhKFJg5PAzIk8KmHtEA",
    authDomain: "faculty-voting.firebaseapp.com",
    databaseURL: "https://faculty-voting.firebaseio.com",
    projectId: "faculty-voting",
    storageBucket: "faculty-voting.appspot.com",
    messagingSenderId: "9270533965",
  appId: "1:9270533965:web:0cf8b954f918a4b588e104"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase