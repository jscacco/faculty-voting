import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';
import SignInForm           from '../components/SignInForm';
import history              from '../history';
import firebase             from '../firebase';
import { validUser }        from '../FirebaseUtil';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

var code = "";

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canVote: null };

    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleSubmit = (event) => {
    event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //console.log(user);
      this.setState({canVote: validUser(user)});
      this.nextPage()   
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      //this.setState({signedIn: false});
    });
  }

  nextPage() {
    console.log("mount");
    history.push('/RoomCode');
  }

  render() {
    console.log(this.state.canVote);

    if(this.state.canVote && this.state.canVote.constructor === Promise) {
      this.state.canVote.then((result) => {
        if(result) {
          history.push('/RoomCode');
        }
      })
    }

    return (
      <>
        <SignInForm title="HamPolls" width={0} color={"transparen"} signedIn = {this.signedIn} handleSubmit={this.handleSubmit}/>
        <ParticlesBg type="cobweb" color={Colors.LightBlue} bg={true} />
      </>
    );
  }
};

export default SignInScreen;