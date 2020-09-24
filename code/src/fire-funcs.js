import firebase             from '../firebase';
import {code} from './RoomCode';


//               (roomCode, pollTitle, "yes", 0)
function sendFire(collectionName, docName, fieldName, fieldValue) {
    firebase
        .firestore()
        .collection(collectionName)
        .doc(docName)
        .set({
            name: fieldName,
            value: fieldValue});
}

function addPollFire(collectionName, docName, option, fieldName, fieldValue) {
    firebase
        .firestore()
        .collection(collectionName)
        .doc(docName)
        .collection("results")
        .doc(option)
        .set({
            name: fieldName,
            value: fieldValue});
}

function getPollInfo() {

}

// firebase.firestore().collection(code).doc("general-poll");
// docRef.get().then(snap =>{
//    console.log(snap);
//    if (this.state.vote == 0) {
//      docRef.update({
//       yes: Number(snap.data()['yes'].toString()) + 1
//     });
//     }