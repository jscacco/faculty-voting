import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import HostPollCard         from '../components/cards/HostPollCard';

import { fetchPollData } from '../store/MockDataFunctions'
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  position: fixed;
  overflow: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

class HostPollPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: fetchPollData('Ammend Clause XYZ'),
      submitted: false,
      submitButton: {
        submitted: false,
        color: Colors.LightGrey,
        text: 'Submit',
        statusText: 'Select your choice.'
      },
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  async onSubmit() {
    console.log("Submitted")
    await this.setState({
      ...this.state,
      submitted: true,
      submitButton: {
        color: Colors.Green,
        text: 'Submitted',
        statusText: 'Your vote has been recorded.',
      }
    })
  }

  async onOptionChange(event) {
    console.log("Changed option")
    await this.setState({
      ...this.state,
      submitButton: {
        color: this.state.submitted ? Colors.Yellow : Colors.Blue,
        text: this.state.submitted ? 'Resubmit' : 'Submit',
        statusText: this.state.submitted ? 'Resubmit my vote.' :  'Submit my vote.',
      }
    })
  }

  render() {
    return (
      <PageWrapper>
        <DemoNavBar />
        <ComponentWrapper>
          <HostPollCard pollData={this.state.poll} onSubmit={this.onSubmit} onOptionChange={this.onOptionChange}
                        buttonColor={this.state.submitButton.color} buttonText={this.state.submitButton.text}
                        statusText={this.state.submitButton.statusText} />
        </ComponentWrapper>
      </PageWrapper>
    );
  }
}

export default HostPollPage;
