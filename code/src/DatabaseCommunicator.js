import PollItem             from './components/PollItem';
import firebase            from './firebase';

const updatePoll = function updatePoll(collectionName, poll, optionNum, voteValue, optionName="") {
    // Updates an already existing poll
    // collectionName - String: The Room Code
    // poll - PollItem: The Poll to Be Updated
    // optionNum - Integer: Index of The Option + 1
    // voteValue - Integer: How to Change The Stored Votes (1 or -1)

    var docRef = firebase.firestore().collection(collectionName).doc(poll.title).collection("Options").doc("Option" + optionNum).collection("Option" + optionNum).doc("Option" + optionNum);
    docRef.get().then((snap) =>{
        // In event of write in, check if that value already exists
        if(snap.data()) {
            console.log("exists");
            var newVote = {};
            newVote["count"] = snap.data()["count"] + voteValue;
            docRef.update(newVote);
        }
        else {
            console.log("doesn't exists");
            ///// NEED TO ADD NEW OPTION HERE /////
        }
    });
}

////// NOT YET IMPLEMENTED //////
const validUser = async function validUser(user) {
    // Checks if user is a "voting faculty"
    let re = /.+@hamilton.edu/;
    let reUser = /[a-z]+/;
    let username = reUser.exec(user.email)[0];

    console.log(user);
    // Check if hamilton email
    if(re.test(user.email)) {  
        firebase
            .firestore()
            .collection('voting').get().then((snap) => {
                snap.forEach((doc) => {
                    //alert(doc.data()['username'] == username);
                
                    if(doc.data()['username'] == username) {
                        console.log('true')
                        return true;
                    }
                })
            })
    } 
    
    return false;
}

const sendPollInfo = function addPollFire(collectionName, poll) {
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
            pollType: poll.pollType
        });

        for(var i = 0; i < poll.options.length; i++) {
            var optionRef = firebase.firestore().collection(collectionName).doc(poll.title).collection("Options").doc("Option" + (i + 1));
                
            optionRef.set({ optionType: "text" });
            
            optionRef.collection("Option" + (i + 1)).doc("Option" + (i + 1)).set(poll.options[i]);
        }
}

const getPollInf = function getPollInf(collectionName, pollTitle) {
    // Returns a PollItem from firebase given the polls title
    // collectionName - String: The Room Code
    // pollTitle - String: The Poll Title

    var poll = new PollItem();
    firebase
        .firestore()
        .collection(collectionName)
        .doc(pollTitle).get()
        .then((snap) =>{
            poll.setDescription(snap.data()['description']);
            poll.setShowResults(snap.data()['showResults']);
            poll.setOrder(snap.data()['order']);
            poll.setType(snap.data()['pollType']);
            poll.setStatus(snap.data()['status']);

            var optionRef = firebase.firestore().collection(collectionName).doc(pollTitle).collection('Options');
            optionRef.get().then((snap) =>{
                snap.forEach(function (doc) {
                    optionRef.doc(doc.id).collection(doc.id).doc(doc.id).get().then((result) => {
                        poll.addPollChoice(result.data()["value"], result.data()["count"]);
                    });
                });
            });

        poll.setTitle(pollTitle);
        });
    //console.log(poll)
    return poll;
}

const getAllPolls = async function getPolls(collectionName) {
    // Returns a list containing PollItems for each poll that exists
    // collectionName - String: The Room Code
    var docs = new Array()

    firebase
        .firestore()
        .collection(collectionName)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
            docs.push(getPollInf(collectionName, doc.id))
        })
    })

    return docs;
}

export default sendPollInfo;
export {getPollInf, getAllPolls, updatePoll, validUser};
