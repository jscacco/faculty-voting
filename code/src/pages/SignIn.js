import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';
import SignInForm           from '../components/SignInForm';
import history              from '../history';
import firebase             from '../firebase';
import auth                 from '../firebase';
import { validUser }        from '../database/DatabaseCommunicator';
import { Link }             from "react-router-dom";
import RoomItem             from '../components/RoomItem';
import testRoom             from '../testData';

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

    this.room = testRoom;
    console.log(this.room)
  } 

  handleSubmit = (event) => {
    event.preventDefault();
    validUser().then(result => {
      console.log("CAN VOTE:")
      console.log(result) 
      this.setState({
        canVote: result
      })
      if(result) { 
        alert("Eligible to vote");
        history.push({ pathname: '/RoomCode', state: { voteStatus: this.state.canVote, room: this.room } });
      } 
      else { 
        alert("Not eligible to vote"); 
      }
    });
  }
  

  render() {
    return (
      <>
        <SignInForm title="HamPolls" width={0} color={"transparen"} canVote = {this.canVote} handleSubmit={this.handleSubmit}/>
        <ParticlesBg type="cobweb" color={Colors.LightBlue} bg={true} />
        <Link to={{ pathname: "/RoomCode", state: this.state.canVote }} />
      </>
    );
  }
};

export default SignInScreen;