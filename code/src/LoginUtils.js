import firebase from './firebase'

const logCurrentUserEmail = () => {
    var email = "";
    if (firebase.auth().currentUser === null) {
	email = "null";
    } else {
	email = firebase.auth().currentUser.email;
    }
    console.log("Current user: " + email);
}


const userLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    logCurrentUserEmail();

    // only login if we aren't yet logged in
    if (firebase.auth().currentUser === null) {
	firebase.auth().signInWithPopup(provider).then(function(result) {
	    // This gives you a Google Access Token. You can use it to access the Google API.
	    var token = result.credential.accessToken;
	    // The signed-in user info.
	    var user = result.user;
	    // ...
	    
	    // TODO: Finish this?
	    logCurrentUserEmail();
	    
	}).catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    // The email of the user's account used.
	    var email = error.email;
	    // The firebase.auth.AuthCredential type that was used.
	    var credential = error.credential;
	    // ...
	    
	    // TODO: finish this?
	    console.log("There is an error! Look at userLogin in LoginUtils.js!");
	});
    } else {
	alert("Already logged in as " + firebase.auth().currentUser.email);
    }
}
    
export default userLogin;
