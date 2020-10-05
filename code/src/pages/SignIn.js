import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';
import SignInForm           from '../components/SignInForm';
import history              from '../history';
import firebase             from '../firebase';
import auth                 from '../firebase';
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

  async checkUser() {
    var provider = new firebase.auth.GoogleAuthProvider();

    await firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //console.log(user);
      history.push('/RoomCode');
      return user;
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
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var user = this.checkUser();
    /*if(user) {
      validUser(user).then((result) => {
        console.log(result) 
        this.setState({
          canVote: result
        })
      });
    }*/
  }
  

  render() {
    return (
      <>
        <SignInForm title="HamPolls" width={0} color={"transparen"} canVote = {this.canVote} handleSubmit={this.handleSubmit}/>
        <ParticlesBg type="cobweb" color={Colors.LightBlue} bg={true} />
      </>
    );
  }
};

export default SignInScreen;