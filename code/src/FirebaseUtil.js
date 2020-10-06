import PollItem             from './components/PollItem';
import firebase             from './firebase';

/*const updatePoll = function updatePoll(collectionName, pollTitle, optionName, optionNum, voteValue) {
    // Updates an already existing poll
    // collectionName - String: The Room Code
    // pollTitle - String: The Poll Title
    // optionName - String: The Name of The Option
    // optionNum - Integer: Index of The Option + 1
    // voteValue - Integer: How to Change The Stored Votes (1 or -1)

    var docRef = firebase.firestore().collection(collectionName).doc("Test Poll").collection("results").doc("Option" + optionNum);
    docRef.get().then(snap =>{
        var newVote = {};
        newVote[optionName] = snap.data()[optionName] + voteValue;
        docRef.update(newVote);
    });
}*/

const updatePoll = function updatePoll(collectionName, poll, optionNum, voteValue) {
    // Updates an already existing poll
    // collectionName - String: The Room Code
    // pollTitle - String: The Poll Title
    // optionName - String: The Name of The Option
    // optionNum - Integer: Index of The Option + 1
    // voteValue - Integer: How to Change The Stored Votes (1 or -1)

    // This will eventally be poll.title                             xxxxxxxxxxx
    var docRef = firebase.firestore().collection(collectionName).doc("Test Poll").collection("results").doc("Option" + optionNum);
    docRef.get().then(snap =>{
        var newVote = {};
        var name = Object.keys(poll.options[optionNum - 1])[0];
        console.log(name)
        console.log(snap.data()[name])
        newVote[name] = snap.data()[name] + voteValue;
        (console.log(newVote[name]))
        docRef.update(newVote);
    });
}

const addPollFire = function addPollFire(collectionName, poll) {
    // Adds a new poll
    // collectionName - String: The Room Code
    // poll - PollItem: The Poll to Be Stored

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

    for(var i = 0; i < poll.options.length; i++) {
        firebase
            .firestore()
            .collection(collectionName)
            .doc(poll.title)
            .collection("results")
            .doc("Option" + (i + 1))
            .set(poll.options[i]);
    }
}

const getPollInf = function getPollInf(collectionName, pollTitle) {
    // Returns a PollItem from firebase given the polls title
    // collectionName - String: The Room Code
    // pollTitle - String: The Poll Title

    var poll = new PollItem();
    firebase.firestore().collection(collectionName).doc(pollTitle).get().then(snap =>{
        poll.setDescription(snap.data()['description']);
        poll.setShowResults(snap.data()['showResults']);
        poll.setOrder(snap.data()['order']);
        poll.setType(snap.data()['type']);
        poll.setStatus(snap.data()['status']);

        firebase.firestore().collection(collectionName).doc(pollTitle).collection('results').get().then(snap =>{
            poll.setOptions(snap.docs.map(doc => doc.data()))
        });

        poll.setTitle(pollTitle);
    });

    return poll;
}

const getAllPollsPromise = (collectionName) => {
  return new Promise(resolve => {
    var docs = new Array()

    firebase.firestore().collection(collectionName).get().then((snap) => {
      snap.forEach((doc) => {
          docs.push(getPollInf(collectionName, doc.id))
      })
    });

    resolve(docs)
  })
}

const getAllPolls = async function getPolls(collectionName) {
    // Returns a list containing PollItems for each poll that exists
    // collectionName - String: The Room Code

    let polls;

    getAllPollsPromise(collectionName).then(docs => {polls = docs})

    return polls;
}

export default addPollFire;
export {getPollInf, getAllPolls, updatePoll};
