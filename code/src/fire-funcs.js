import firebase             from './firebase';
import {code}               from './pages/RoomCode';


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

//const addPollFire = function addPollFire(collectionName, docName, option, fieldName, fieldValue) {
//    firebase
//        .firestore()
//        .collection(collectionName)
//        .doc(docName)
//        .collection("results")
//        .doc(option)
//        .set({
//            name: fieldName,
//            value: fieldValue});
//}

const addPollFire = function addPollFire(collectionName, poll) {
    firebase
      .firestore()
      .collection(collectionName)
      .doc(poll.title)
      .set({
        description: poll.description,
        showResult: poll.showResults,
        order: poll.order});

    firebase
        .firestore()
        .collection(collectionName)
        .doc(poll.title)
        .collection("results")
        .doc("Option" + poll.order.toString())
        .set(poll.optMap);
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

export default addPollFire;