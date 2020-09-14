import React    from 'react';
import styled   from 'styled-components';

import { Colors } from '../components/theme/Colors';
import Button from '../components/Button';
import Bubble from '../components/Bubble';
import Option from '../components/Option';
import OptionGroup from '../components/OptionGroup';
import Card from '../components/Card';
import VotingCard from '../components/VotingCard';

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
    if (this.state.selectedBubble && !this.state.voted){
      this.setState({voted: true,
                     vote: this.state.selectedBubble});
    }
    else if (this.state.selectedBubble != this.state.submittedBubble){
      this.setState({voted: true,
                     vote: this.state.selectedBubble});
    }
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
                      options={['Option 1', 'Option 2', 'Option 3']}
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
