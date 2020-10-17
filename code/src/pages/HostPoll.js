import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import HostPollCard         from '../components/cards/HostPollCard';
import EditPollCard         from '../components/cards/EditPollCard';

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
      poll: fetchPollData('0002', '02'),
      isEditing: false,

      submitted: false,
      submitButton: {
        submitted: false,
        color: Colors.LightGrey,
        text: 'Submit',
        statusText: 'Select your choice.'
      },
      selectedOptions: [],
    }

    this.setState({
      ...this.state,
      onSelectOption: Array(this.state.poll.options.length).fill(false),

    })

    this.onEditClick = this.onEditClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  async onEditClick() {
    await this.setState({
      ...this.state,
      isEditing: !this.state.isEditing
    })
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
    console.log(this.state.selectedOptions)
    await this.setState({
      ...this.state,
      submitButton: {
        color: this.state.submitted ? Colors.Yellow : Colors.Blue,
        text: this.state.submitted ? 'Resubmit' : 'Submit',
        statusText: this.state.submitted ? 'Resubmit my vote.' : 'Submit my vote.',
      }
    })
  }

  render() {
    return (
      <PageWrapper>
        <DemoNavBar />
        <ComponentWrapper>
          { !this.state.isEditing ?
            <EditPollCard pollData={this.state.poll} onSubmit={this.onSubmit}
                          onOptionChange={this.onOptionChange} onEditClick={this.onEditClick} /> :
            <HostPollCard pollData={this.state.poll} onSubmit={this.onSubmit} onOptionChange={this.onOptionChange}
                        buttonColor={this.state.submitButton.color} buttonText={this.state.submitButton.text}
                        statusText={this.state.submitButton.statusText} onEditClick={this.onEditClick} />
          }
        </ComponentWrapper>
      </PageWrapper>
    );
  }
}

export default HostPollPage;
