import React    from 'react';
import styled   from 'styled-components';

import { Colors } from '../components/theme/Colors';
import Button from '../components/Button';
import Bubble from '../components/Bubble';
import Option from '../components/Option';
import OptionGroup from '../components/OptionGroup';
import Card from '../components/Card';
import VotingCard from '../components/VotingCard';
import firebase from '../firebase';
import {code} from './RoomCode';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

class PollScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedBubble: null,
                  submittedBubble: null,
                  voted: false,
                  last_vote: null,
                  vote: null};
    //
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOptionClick = (id) => {
    if (this.state.selectedBubble === id) {
      this.setState({selectedBubble: null});
    }
    else { this.setState({selectedBubble: id}); }
  }


  handleSubmit = (event) => {
    event.preventDefault();
    var docRef = firebase.firestore().collection(code).doc("general-poll");

    if (this.state.selectedBubble && !this.state.voted){
      this.setState({voted: true,
                     vote: this.state.selectedBubble});
    }
    else if (this.state.selectedBubble != this.state.submittedBubble){
      this.setState({voted: true,
                     last_vote: this.state.vote,
                     vote: this.state.selectedBubble});
    }

    docRef.get().then(snap =>{
      console.log(snap);
      if (this.state.vote == 0) {
        docRef.update({
          yes: Number(snap.data()['yes'].toString()) + 1
        });
       }
       else if (this.state.vote == 1) {
        docRef.update({
          no: Number(snap.data()['no'].toString()) + 1
        });
      }
      else if (this.state.vote == 2) {
        docRef.update({
          abstain: Number(snap.data()['abstain'].toString()) + 1
        });
      }

      if (this.state.last_vote == 0) {
        docRef.update({
          yes: Number(snap.data()['yes'].toString()) - 1
        });
       }
       else if (this.state.last_vote == 1) {
        docRef.update({
          no: Number(snap.data()['no'].toString()) - 1
        });
      }
      else if (this.state.last_vote == 2) {
        docRef.update({
          abstain: Number(snap.data()['abstain'].toString()) - 1
        });
      }
     });
  }

  render() {

    const unselected = this.state.selectedBubble === null;
    const submit = !this.state.voted;
    const submitted = this.state.selectedBubble === this.state.vote;
    const resubmit = this.state.selectedBubble != this.state.vote;

    return (
        <PageWrapper>
          <VotingCard medium
                      width={600}
                      title={'Poll Title'}
                      description={'Description of the poll... very informative.'}
                      options={['Yes', 'No', 'Abstain']}
                      handleOptionClick={this.handleOptionClick}
                      selectedBubble={this.state.selectedBubble}
                      handleSubmit={this.handleSubmit}
                      unselected={unselected} submit={submit} resubmit={resubmit} submitted={submitted}/>
        </PageWrapper>
      );
  }
};




// const PollScreen = (props) => {
//
//   return(
//     <PageWrapper>
//       <VotingCard medium
//                   width={600}
//                   title={'Poll Title'}
//                   description={'Description of the poll... very informative.'}
//                   options={['Option 1', 'Option 2', 'Option 3']}/>
//     </PageWrapper>
//   )
//
// };

export default PollScreen;
