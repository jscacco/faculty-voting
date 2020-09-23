import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import history              from '../history';
import HostControlPanel     from '../components/HostControlPanel';
import Input                from '../components/inputs/Input'
import Agenda               from '../components/Agenda'
import AgendaItem           from '../components/AgendaItem'


import PollItem             from '../components/PollItem'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

class MeetingRoomScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // State values for creating a new poll
      optionComponents: [<Input placeholder={'Option'}
                                onChange={this.handleChange}/>,
                         <Input placeholder={'Option'}
                                onChange={this.handleChange}/>],
      poll: new PollItem(),
      agenda: <Agenda width={750} />,
    }
  }

  addOption = () => {
    this.setState({
      optionComponents: [...this.state.optionComponents,
                         <Input placeholder={'Option'}
                                onChange={this.handleOptionChange}/>]
    })

    console.log('Option added')
    console.log(this.state.optionComponents.length)
  }

  handleTitleChange = (event) => {
    this.state.poll.setTitle(event.target.value)

    console.log('New title: ' + this.state.poll.title)
  }

  handleDescriptionChange = (event) => {
    this.state.poll.setDescription(event.target.value)

    console.log('New Desc: ' + this.state.poll.description)
  }

  handleOptionChange = (event) => {
    console.log('Option value being changed')

    console.log(event.target.value)
  }

  handleCreatePoll = () => {
    alert('Creating poll ' + this.state.poll.title + ' ' + this.state.poll.description)

    // this.state.agenda.setState({
    //   polls: [...this.state.agenda.state.polls, <AgendaItem width={600} />]
    // })
  }

  render() {
    return (
      <PageWrapper>
        <SideBySideWrapper>
          <HostControlPanel width={300} title="Create a Poll"
                            handleSubmit={this.handleCreatePoll}
                            handleCreateOption={this.addOption}
                            handleOptionChange={this.handleOptionChange}
                            handleTitleChange={this.handleTitleChange}
                            handleDescriptionChange={this.handleDescriptionChange}
                            options={this.state.optionComponents} />
          {this.state.agenda}
        </SideBySideWrapper>
      </PageWrapper>
    );
  }

};

export default MeetingRoomScreen;
