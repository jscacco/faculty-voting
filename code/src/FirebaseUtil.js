import PollItem             from './components/PollItem';
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

const addPollFire = function addPollFire(collectionName, poll) {
    firebase
      .firestore()
      .collection(collectionName)
      .doc(poll.title)
      .set({
        description: poll.description,
        showResults: poll.showResults,
        order: poll.order,
        status: poll.status,
        type: poll.type});

    firebase
        .firestore()
        .collection(collectionName)
        .doc(poll.title)
        .collection("results")
        .doc("Option" + poll.order.toString())
        .set(poll.optionMap);
}

const getPollInf = function getPollInf(collectionName, pollTitle) {
    var poll = new PollItem();
    var docRef = firebase.firestore().collection(collectionName).doc(pollTitle);

    docRef.get().then(snap =>{
        console.log(snap.data());

        poll.setDescription(snap.data()['description'].toString())
        poll.setShowResults(snap.data()['showResults'].toString())
        poll.setOrder(snap.data()['order'].toString())
        poll.setType(snap.data()['type'].toString())
        poll.setStatus(snap.data()['status'].toString())
    });

    poll.setTitle(pollTitle);
    return poll;
}

const getAllPolls = function getPolls(collectionName) {
    firebase.firestore().collection(collectionName).get().then((snap) => {
        const docs = []
        snap.forEach((doc) => {
            console.log(doc.id)
            docs.push(getPollInf(collectionName, doc.id))
        })
        console.log(docs)
    })
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
export {getPollInf, getAllPolls};
