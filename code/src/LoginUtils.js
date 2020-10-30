import firebase from './databaseCommunication/permissions.js'

const fireauth = firebase.auth();

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
    console.log(email);
    return email;
}


const userLogin = async () => {
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
	
	console.log(error);  // Handle Errors here.
	var errorCode = error.code;
	console.log(errorCode);
	alert(errorCode);
	
	var errorMessage = error.message;
	console.log(errorMessage);
	alert(errorMessage);
    });
}

const userIsHamiltonian = () => {
    let email = getCurrentUserEmail();
    let result = (email.split('@')[1] == "hamilton.edu");
    return result;
}

export {userLogin, getCurrentUserEmail, signOutCurrentUser, userIsHamiltonian};
