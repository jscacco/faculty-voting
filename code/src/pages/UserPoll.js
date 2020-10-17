import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import UserPollCard         from '../components/cards/UserPollCard';

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

class UserPollPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        id: '02',
        title: 'Poll 02',
        status: 'open',
        type: 'single',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum egestas nulla non accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur nunc nisl, condimentum scelerisque dignissim sed, mattis in est. Nullam eu sem ultrices, consequat velit eget, fringilla justo. Mauris quis sodales purus, eu sollicitudin risus. Etiam malesuada risus a nibh facilisis volutpat. Praesent a bibendum mi, gravida pulvinar mauris. In hac habitasse platea dictumst. retium ligula at tincidunt. Suspendisse accumsan magna consequat dolor porttitor vestibulum vitae sed enim. Pellentesque ut viverra odio, non suscipit felis. Mauris elit nisl, luctus nec fermentum quis, interdum nec ligula.",
        options: {
          '00': {id: '00', value: "Option 1", count: 0, optionType: 'text'},
          '01': {id: '01', value: "Option 2", count: 0, optionType: 'text'},
          '02': {id: '02', value: "Option 3", count: 0, optionType: 'input'}
        },
        optionsOrder: ['00', '01', '02'],
      },
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
          <UserPollCard pollData={this.state.poll} onSubmit={this.onSubmit} onOptionChange={this.onOptionChange}
                        buttonColor={this.state.submitButton.color} buttonText={this.state.submitButton.text}
                        statusText={this.state.submitButton.statusText} />
        </ComponentWrapper>
      </PageWrapper>
    );
  }
}

export default UserPollPage;
