import firebase from './databaseCommunication/permissions.js'

const fireauth = firebase.auth();
const firestore = firebase.firestore();

const signOutCurrentUser = async () => {
    fireauth.signOut().then(function() {
	     // Sign-out successful.
    }).catch(function(error) {
	     // An error happened.
    });
}

const getCurrentUserEmail = () => {
    let email = "";
    if (fireauth.currentUser === null) {
	email = "null";
    } else {
	email = fireauth.currentUser.email;
    }
    return email;
}


const setPersistence = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}


const userLogin = async (loginType) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
	     'prompt': 'select_account'
    });

    await fireauth.signInWithPopup(provider)

    // await fireauth.signInWithPopup(provider).then(function(result) {
// 	// This gives you a Google Access Token. You can use it to access the Google API.
// 	var token = result.credential.accessToken;
// 	// The signed-in user info.
// 	var user = result.user;
// 	// ...
//     }).catch(function(error) {
// 	// Handle Errors here.
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	// The email of the user's account used.
// 	var email = error.email;
// 	// The firebase.auth.AuthCredential type that was used.
// 	var credential = error.credential;
// 	// ...
//
// 	console.log(error);  // Handle Errors here.
// 	var errorCode = error.code;
// 	console.log(errorCode);
//
// 	var errorMessage = error.message;
// 	console.log(errorMessage);
//
// 	signOutCurrentUser();
//     });
}

const userIsHamiltonian = () => {
    let email = getCurrentUserEmail();
    let result = (email.split('@')[1] == "hamilton.edu");

    if (!result) throw "Not Hamiltonian"

    return result;

}


const getUserId = async () => {
    if (!(await userIsLoggedIn())) {
	throw 'Not logged in.';
    } else {
	let email = getCurrentUserEmail();
	return email.split('@')[0];
    }
}


const userIsHost = (host_id) => {
    if (getUserId() == host_id) {
	     return true;
    } else {
	     return false;
    }
}

const userIsVoter = async () => {
    // Return true if the current user is a voter
    // code from
    // https://stackoverflow.com/questions/53332471/checking-if-a-document-exists-in-a-firestore-collection
    const user_id = await getUserId();
    // try {
	let docRef = firestore
	    .collection("voting")
	    .doc(user_id)

	let doc = await docRef.get();

	if (doc.exists) {
	    return user_id;
	} else {
	    throw 'Not a voter.'
	}
}


const userIsLoggedIn = async () => {
    return fireauth.currentUser !== null;
}


const userIsHostOfRoom = async (room_id) => {
    // Given a roomId, returns true if the currently logged in user is the host of that room.

    console.log("checking if current user is host of " + room_id);

    let currentUser = await getUserId();

    // try {
	let docRef = firestore
	    .collection(currentUser)
	    .doc(room_id);

	let doc = await docRef.get();

	if (doc.exists) {
	    return currentUser;
	} else {
	    // return null;
      throw 'User is not host of room.'
	}
}

const getUser = async () => {
  // return fireauth.currentUser
  await firebase.auth().onAuthStateChanged((user) => {
      if (user === null) { return Error('error')}
        // set a local state as we do not have the current user yet
      else { console.log('here'); return user }
        // only now will  app.auth().currentUser give you a valid user
 });
}

export { getUser, setPersistence, userLogin, getUserId, getCurrentUserEmail, signOutCurrentUser, userIsHamiltonian, userIsHost, userIsVoter, userIsLoggedIn, userIsHostOfRoom};
