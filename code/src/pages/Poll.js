import React    from 'react';
import styled   from 'styled-components';

import { Colors } from '../components/theme/Colors';

import MultiVoteCard from '../components/cards/MultiVoteCard';
import SnglVoteCard from '../components/cards/SnglVoteCard';

import firebase from '../firebase';
//import { code } from './RoomCode';
import { getPollInf, updatePoll } from '../database/DatabaseCommunicator';
import testRoom from '../testData';

const code = 'test';
const path = testRoom.getPath();

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;


const getInitInfo = (pollName) => {
  
  // hard coded for now, need to get this information from firebase and return in this structure
  
  const pollInfo = {
    type: 'multiple',
    title: 'Poll Title',
    description: 'Descriptive description of ze poll...',
    options: [
      { type: 'text',
        value: 'Option 1' },
      { type: 'text',
        value: 'Option 2' },
      { type: 'input',
        value: null }
    ],
  };

  return pollInfo;
  //return getPollInf(path, pollName).getInfo();
}

class PollScreen extends React.Component {
  constructor(props) {
    super(props);

    const pollInfo = getInitInfo(this.props.pollName);
    
    this.state = { ...pollInfo,
                   submission: null,
                   poll: getPollInf(path, "Poll1")};
    console.log(this.state.poll);
    this.state.poll.then(result => { this.setState({ poll: result }); console.log(this.state.poll)}).finally();
    console.log(this.state.poll)
    this.updateMultiple = this.updateMultiple.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSingle = this.renderSingle.bind(this);
    this.renderMultiple = this.renderMultiple.bind(this);
    this.pollName = this.props.pollName;
  };

  updateMultiple = (submitUpdate) => {
    
    // submittedOptions is an array of length options.length, each index is true/false if the corresponding option (options[index]) is voted on

    const { submittedOptions, options } = submitUpdate;
    const prevSubmission = this.state.submission;
    
    console.log(options)
    console.log(submittedOptions)
    console.log(prevSubmission)

    for (let i = 0; i < options.length; i++) {
      if (prevSubmission === null) {
        if (submittedOptions[i]) {
          this.poll = updatePoll(path, this.state.poll, i + 1, 1, options[i].value);
        }
        console.log('updateFirebase'); 
      } 
      else if (prevSubmission[i] != submittedOptions[i]){
        // updateFirebase
        // remove prev vote / submit new vote
        if (submittedOptions[i]) {
          this.poll = updatePoll(path, this.state.poll, i + 1, 1, options[i].value);
        }
        else if (prevSubmission[i]) {
          this.poll = updatePoll(path, this.state.poll, i + 1, -1, options[i].value);
        }
        console.log('updateFirebase')
      }
    }
  }


  async handleSubmit(submitUpdate) {

    // THIS FUNCTION IS ONLY CALLED IF THERE IS A NEW SUBMIT

    const { submittedOptions, options } = submitUpdate;

    if (this.state.type === 'multiple') {
      this.updateMultiple(submitUpdate)
    }
    else { // SINGLE
      console.log('updateFirebase')
    }

    await this.setState({ ...this.state,
                          submission: submittedOptions });

    console.log(this.state)

  }

  renderSingle = () => (

    <SnglVoteCard title={this.state.title}
                  description={this.state.description}
                  options={this.state.options}
                  getVote={(submitUpdate) => this.handleSubmit(submitUpdate)}
                  medium/>
  );

  renderMultiple = () => (
    <MultiVoteCard title={this.state.title}
                   description={this.state.description}
                   options={this.state.options}
                   getVote={(submitUpdate) => this.handleSubmit(submitUpdate)}
                   medium/>
  );

  render() {

    return (
        <PageWrapper>
        {this.state.type === 'single' ? this.renderSingle() : this.renderMultiple()}
        </PageWrapper>
      );
  }
};

export default PollScreen;

// class PollScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {selectedBubble: null,
//                   submittedBubble: null,
//                   voted: false,
//                   last_vote: null,
//                   vote: null};
//     //
//     this.handleOptionClick = this.handleOptionClick.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleOptionClick = (id) => {
//     if (this.state.selectedBubble === id) {
//       this.setState({selectedBubble: null});
//     }
//     else { this.setState({selectedBubble: id}); }
//   }
//
//
//   handleSubmit = (event) => {
//     event.preventDefault();
//     var docRef = firebase.firestore().collection(code).doc("general-poll");
//
//     if (this.state.selectedBubble && !this.state.voted){
//       this.setState({voted: true,
//                      vote: this.state.selectedBubble});
//     }
//     else if (this.state.selectedBubble != this.state.submittedBubble){
//       this.setState({voted: true,
//                      last_vote: this.state.vote,
//                      vote: this.state.selectedBubble});
//     }
//
//     docRef.get().then(snap =>{
//       console.log(snap);
//       if (this.state.vote == 0) {
//         docRef.update({
//           yes: Number(snap.data()['yes'].toString()) + 1
//         });
//        }
//        else if (this.state.vote == 1) {
//         docRef.update({
//           no: Number(snap.data()['no'].toString()) + 1
//         });
//       }
//       else if (this.state.vote == 2) {
//         docRef.update({
//           abstain: Number(snap.data()['abstain'].toString()) + 1
//         });
//       }
//
//       if (this.state.last_vote == 0) {
//         docRef.update({
//           yes: Number(snap.data()['yes'].toString()) - 1
//         });
//        }
//        else if (this.state.last_vote == 1) {
//         docRef.update({
//           no: Number(snap.data()['no'].toString()) - 1
//         });
//       }
//       else if (this.state.last_vote == 2) {
//         docRef.update({
//           abstain: Number(snap.data()['abstain'].toString()) - 1
//         });
//       }
//      });
//   }
//
//   render() {
//
//     const unselected = this.state.selectedBubble === null;
//     const submit = !this.state.voted;
//     const submitted = this.state.selectedBubble === this.state.vote;
//     const resubmit = this.state.selectedBubble != this.state.vote;
//
//     return (
//         <PageWrapper>
//           <VotingCard medium
//                       width={600}
//                       title={'Poll Title'}
//                       description={'Description of the poll... very informative.'}
//                       options={['Yes', 'No', 'Abstain']}
//                       handleOptionClick={this.handleOptionClick}
//                       selectedBubble={this.state.selectedBubble}
//                       handleSubmit={this.handleSubmit}
//                       unselected={unselected} submit={submit} resubmit={resubmit} submitted={submitted}/>
//         </PageWrapper>
//       );
//   }
// };
