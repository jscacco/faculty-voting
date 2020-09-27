import React    from 'react';
import styled   from 'styled-components';

import { connect } from 'react-redux';

import * as actions from '../store/actions/index'

import { Colors } from '../components/theme/Colors';

import MultiVoteCard from '../components/cards/MultiVoteCard';
import SnglVoteCard from '../components/cards/SnglVoteCard';

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


// const getInitInfo = (pollName) => {
//
//   const pollInfo = {
//     type: 'multiple',
//     title: 'Poll Title',
//     description: 'Descriptive description of ze poll...',
//     options: [
//       { type: 'text',
//         value: 'Option 1' },
//       { type: 'text',
//         value: 'Option 2' },
//       { type: 'input',
//         value: null }
//     ],
//   };
//
//   return pollInfo
// }
//
// class PollScreen extends React.Component {
//   constructor(props) {
//     super(props);
//
//     const pollInfo = getInitInfo(this.props.pollName);
//
//     this.state = { ...pollInfo,
//                    submission: null,};
//
//     this.updateMultiple = this.updateMultiple.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.renderSingle = this.renderSingle.bind(this);
//     this.renderMultiple = this.renderMultiple.bind(this);
//
//   };
//
//   updateMultiple = (submitUpdate) => {
//
//     const { submittedOptions, options } = submitUpdate;
//     const prevSubmission = this.state.submission;
//
//     if (prevSubmission === null) {
//       console.log('updateFirebase')
//       return;
//     }
//     for (let i = 0; i < options.length; i++) {
//       if (prevSubmission[i] != submittedOptions[i]){
//         // updateFirebase
//         console.log('updateFirebase')
//       }
//     }
//   }
//
//
//   async handleSubmit(submitUpdate) {
//
//     // THIS FUNCTION IS ONLY CALLED IF THERE IS A NEW SUBMIT
//
//     const { submittedOptions, options } = submitUpdate;
//
//     if (this.state.type === 'multiple') {
//       this.updateMultiple(submitUpdate)
//     }
//     else { // SINGLE
//       console.log('updateFirebase')
//     }
//
//     await this.setState({ ...this.state,
//                           submission: submittedOptions });
//
//     console.log(this.state)
//
//   }
//
//   renderSingle = () => (
//
//     <SnglVoteCard title={this.state.title}
//                   description={this.state.description}
//                   options={this.state.options}
//                   getVote={(submitUpdate) => this.handleSubmit(submitUpdate)}
//                   medium/>
//   );
//
//   renderMultiple = () => (
//     <MultiVoteCard title={this.state.title}
//                    description={this.state.description}
//                    options={this.state.options}
//                    getVote={(submitUpdate) => this.handleSubmit(submitUpdate)}
//                    medium/>
//   );
//
//   render() {
//
//     console.log(this.props);
//
//     // const test = { 'test': 'ok'};
//     // const tv = 'test';
//     //
//     // console.log(test.{'test'});
//
//     return (
//         <PageWrapper>
//         {this.state.type === 'single' ? this.renderSingle() : this.renderMultiple()}
//         </PageWrapper>
//       );
//   }
// };

class PollScreen extends React.Component {

  componentDidMount () {
    this.props.onFetchPoll();

  }

  render (props) {
    console.log(props)
    return (
      <p> test </p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    poll: state.poll.poll,
    loading: state.poll.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPoll: () => dispatch({type: 'FETCH_POLL_START'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollScreen);

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
