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
        if(snap.data() && snap.data()["value"] == optionName) {
            console.log("exists");
            var newVote = {};
            newVote["count"] = snap.data()["count"] + voteValue;
            docRef.update(newVote);
        }
        else {
            ///// NEED SOME TYPE OF OPTION COUNTER HERE /////
            console.log("doesn't exists");
            var optNum = poll.options.length + 1; ////maybe make this number of options

            firebase
                .firestore()
                .collection(collectionName)
                .doc(poll.title)
                .collection("Options")
                .doc("Option" + optNum)
                .set({
                    optionType: 'input'
                });

            firebase
                .firestore()
                .collection(collectionName)
                .doc(poll.title)
                .collection("Options")
                .doc("Option" + optNum)
                .collection("Option" + optNum)
                .doc("Option" + optNum)
                .set({
                    count: 1,
                    value: optionName
                });
            
        }
    });

    return poll;
}

async function getUser() {
    console.log("Getting User")
    var user; 
    var provider = new firebase.auth.GoogleAuthProvider();

    await firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      //console.log(user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      return null;
    });

    console.log(user);
    return user;
}

////// NOT YET IMPLEMENTED //////
const validUser = async function validUser() {
    // Checks if user is a "voting faculty"
    let user = await getUser();
    let re = /.+@hamilton.edu/;
    let reUser = /[a-z]+/;    
    let username = reUser.exec(user.email)[0];
    let vote = false;
    
    //console.log(user);
    // Check if hamilton email
    if(re.test(user.email)) {  
        await firebase
            .firestore()
            .collection('voting').get().then((snap) => {
                snap.forEach((doc) => {
                    //alert(doc.data()['username'] == username);
                
                    if(doc.id == username) {
                        console.log('true')
                        vote = true;
                    }
                })
            })
    } 
    
    
    return vote;
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

const getPollInf = async function getPollInf(collectionName, pollTitle) {
    // Returns a PollItem from firebase given the polls title
    // collectionName - String: The Room Code
    // pollTitle - String: The Poll Title

    var poll = new PollItem();
    await firebase
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

    /*firebase
        .firestore()
        .collection(collectionName)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
            docs.push(getPollInf(collectionName, doc.id))
        })
    })*/
    var lst = ["Test Poll", "test"]
    for(var docId of lst) {
        docs.push(await getPollInf(collectionName, docId));
    }

    return docs;
}

export default sendPollInfo;
export {getPollInf, getAllPolls, updatePoll, validUser};
