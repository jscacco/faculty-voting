import React    from 'react';
import styled   from 'styled-components';

import { Colors } from '../components/theme/Colors';
import Button from '../components/Button';
import Bubble from '../components/Bubble';
import Option from '../components/Option';
import OptionGroup from '../components/OptionGroup';
import Card from '../components/Card';
import VotingCard from '../components/VotingCard';
import firebase from '../firebase'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedBubble: null};
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
     var yes_votes
     var no_votes
     var abstain_votes
     var docRef = firebase.firestore().collection("0").doc("general-poll")
     docRef.get().then(snap =>{
      if (this.state.selectedBubble == 0) {
        alert('You voted: Yes!');
        docRef.update({
          yes: Number(snap.data()['yes'].toString()) + 1
        })
       }
       else if (this.state.selectedBubble == 1) {
        alert('You voted: No!');
        docRef.update({
          no: Number(snap.data()['no'].toString()) + 1
        })
      }
      else if (this.state.selectedBubble == 2) {
        alert('You voted: Abstain!');
        docRef.update({
          abstain: Number(snap.data()['abstain'].toString()) + 1
        })
      }
       //console.log(snap.data()['no'].toString())
       //yes_votes = snap.data()['yes'].toString()
      // no_votes = snap.data()['no'].toString()
       //abstain_votes = snap.data()['abstain'].toString()
     })
  }

  render() {
    return (
        <PageWrapper>
          <VotingCard medium
                      width={600}
                      title={'Poll Title'}
                      description={'Description of the poll... very informative.'}
                      options={['Yes', 'No', 'Abstain']}
                      handleOptionClick={this.handleOptionClick}
                      handleSubmit={this.handleSubmit}
                      selectedBubble={this.state.selectedBubble}/>
        </PageWrapper>
      );
  }
};




// const MainScreen = (props) => {
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

export default MainScreen;
