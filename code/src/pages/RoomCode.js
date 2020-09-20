import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';
import RoomCodeForm         from '../components/RoomCodeForm';
import history              from '../history';
import firebase from '../firebase'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

var code = "";
var poll_id = 0;

class RoomCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('You are entering room: ' + this.state.value);
    history.push('/Poll')
    event.preventDefault();
    firebase
            .firestore()
            .collection(this.state.value)
            .doc("general-poll")
            .set({
              yes: 0, 
              no: 0, 
              abstain: 0})
    code = this.state.value;
  }

  render() {
    return (
      <>
        <RoomCodeForm title="HamPolls" width={0} color={"transparen"} value={this.value} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <ParticlesBg type="cobweb" color={Colors.LightBlue} bg={true} />
      </>
    );
  }
};

export default RoomCodeScreen;
export {code, poll_id};