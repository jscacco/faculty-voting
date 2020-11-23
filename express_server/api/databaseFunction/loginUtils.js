const admin = require('./permissions');
const firestore = admin.firestore;
const fireauth = admin.fireauth;

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
    //console.log(email);
    return email;
}

const getToken = () => {
	if (fireauth.currentUser === null) {
		return null;
    } else {
		return fireauth.currentUser.uid;
    }
}

const userLogin = async () => {
	//await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
	'prompt': 'select_account'
    });

    await fireauth.signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
    }).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...

		//console.log(error);  // Handle Errors here.
		var errorCode = error.code;
		//console.log(errorCode);

		var errorMessage = error.message;
		//console.log(errorMessage);

		signOutCurrentUser();
    });
}

const userIsHamiltonian = () => {
    let email = getCurrentUserEmail();
    let result = (email.split('@')[1] == "hamilton.edu");
    return result;
}


const getUserId = () => {
    if (!(userIsLoggedIn())) {
		return "";
    } else {
		let email = getCurrentUserEmail();
		return email.split('@')[0];
    }
}

const getUserName = (user) => {
	return user.email.split('@')[0];
}

const userIsHost = async (user_token, host_id) => {
    //console.log("Checking if host...");
    
    if (getUserId() == host_id) {
	//console.log("User is host.")
	return true;
    } else {
	//console.log("User isn't host.");
	return false;
    }
}

const userIsVoter = async (user) => {
    // Return true if the current user is a voter
    // code from
    // https://stackoverflow.com/questions/53332471/checking-if-a-document-exists-in-a-firestore-collection
    //console.log("Checking if voter...");
    
    try {
		let docRef = firestore
			.collection("voting")
			.doc(getUserName(user))

		let doc = await docRef.get();

		if (doc.exists) {
			//console.log("User is a voter.");
			return true;
		} else {
			//console.log("User isn't a voter.");
			return false;
		}
    } catch(error) {
	//console.log(error);
	return false;
    }
}


const userIsLoggedIn = async () => {
    return fireauth.currentUser !== null;
}


const userIsHostOfRoom = async (room_id) => {
    // Given a roomId, returns true if the currently logged in user is the host of that room.

    //console.log("checking if current user is host of " + room_id);
    
    let currentUser = await getUserId();

    try {
	let docRef = firestore
	    .collection(currentUser)
	    .doc(room_id);

	let doc = await docRef.get();

	if (doc.exists) {
	    //console.log("current user is host of " + room_id);
	    return true;
	} else {
	    //console.log("current user isn't host of " + room_id);
	    return false;
	}
    } catch(error) {
	//console.log(error);
	return false;
    }
}

const isHostOfRoom = async (user_id, room_id) => {
	try {
		let docRef = firestore
						.collection(user_id)
						.doc(room_id);

		let doc = await docRef.get();
		// console.log(user_id)
		// console.log(room_id)
		if (doc.exists) {
			//console.log("current user is host of " + room_id);
			return true;
		} else {
			//console.log("current user isn't host of " + room_id);
			return false;
		}
    } catch(error) {
		//console.log(error);
		return false;
    }
}

exports.userLogin = userLogin;
exports.getUserId = getUserId;
exports.getCurrentUserEmail = getCurrentUserEmail;
exports.signOutCurrentUser = signOutCurrentUser;
exports.userIsHamiltonian = userIsHamiltonian;
exports.userIsHost = userIsHost;
exports.userIsVoter = userIsVoter;
exports.getToken = getToken;
exports.userIsLoggedIn = userIsLoggedIn;
exports.userIsHostOfRoom = userIsHostOfRoom;
exports.getUserName = getUserName;
exports.isHostOfRoom = isHostOfRoom;
//module.exports = {userLogin, getUserId, getCurrentUserEmail, signOutCurrentUser, userIsHamiltonian, userIsHost, userIsVoter, getToken, userIsLoggedIn, userIsHostOfRoom};