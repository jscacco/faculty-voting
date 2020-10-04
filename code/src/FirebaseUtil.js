import PollItem             from './components/PollItem';
import firebase             from './firebase';

const updatePoll = function updatePoll(collectionName, pollTitle, optionName, optionNum, voteValue) {
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
}

const validUser = async function validUser(user) {
    // Checks if user is a "voting faculty"
    let re = /.+@hamilton.edu/;
    let reUser = /[a-z]+/;
    let username = reUser.exec(user.email)[0];

    console.log(user)
    // Check if hamilton email
    if(re.test(user.email)) {  
        await firebase
            .firestore()
            .collection('voting').get().then((snap) => {
                snap.forEach((doc) => {
                    alert(doc.data()['username'] == username);
                
                    if(doc.data()['username'] == username) {
                        console.log('true')
                        return true;
                    }
                })
            })
    } 
    
    return false;
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

const getAllPolls = async function getPolls(collectionName) {
    // Returns a list containing PollItems for each poll that exists
    // collectionName - String: The Room Code
    var docs = new Array()

    firebase.firestore().collection(collectionName).get().then((snap) => {
        snap.forEach((doc) => {
            docs.push(getPollInf(collectionName, doc.id))
        })
    })

    return docs;
}

export default addPollFire;
export {getPollInf, getAllPolls, updatePoll, validUser};
