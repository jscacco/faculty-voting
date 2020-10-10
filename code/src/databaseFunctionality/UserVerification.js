import firebase             from '../firebase';

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

const userLogin = async function userLogin() {
    validUser().then(result => {
        if(result) alert("YOU HAVE BEEN LOGGED IN AS A USER"); else alert("NOT A HAMITLON EMAIL");
    }, () => { alert("NOT A HAMITLON EMAIL"); })
}

const hostLogin = async function hostLogin() {
    validUser().then(result => {
        if(result) alert("YOU HAVE BEEN LOGGED IN AS A HOST"); else alert("NOT A HAMITLON EMAIL");
    }, () => { alert("NOT A HAMITLON EMAIL"); })
}

export default userLogin;
export { hostLogin };