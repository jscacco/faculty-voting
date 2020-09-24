import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import history              from '../history';
import HostControlPanel     from '../components/HostControlPanel';
import firebase             from '../firebase';
import {code}               from './RoomCode';
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
    var order = 1;
    this.state = {
      // State values for creating a new poll
      optionComponents: [<Input placeholder={'Option'}
                                onChange={this.handleChange}/>,
                         <Input placeholder={'Option'}
                                onChange={this.handleChange}/>],
      options: [],
      pollTitle: '',
      pollDescription: '',
      showResults: true,
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
    this.setState({
      pollTitle: event.target.value
    })
    this.state.poll.setTitle(event.target.value)

    console.log('New title: ' + this.state.poll.title)
  }

  handleDescriptionChange = (event) => {
    this.setState({
      pollDescription: event.target.value
    })
    this.state.poll.setDescription(event.target.value)

    console.log('New Desc: ' + this.state.poll.description)
  }

  handleOptionChange = (event) => {
    console.log('Option value being changed')

    console.log(event.target.value)
  }

  handleCreatePoll = () => {
    this.state.poll.setOrder(order);
    order += 1;

    alert('Creating poll ' + this.state.pollTitle + ' ' + this.state.pollDescription)
  
    firebase
      .firestore()
      .collection(code)
      .doc(this.state.poll.title)
      .set({
        description: this.state.poll.description,
        showResult: this.state.poll.showResults,
        order: this.state.poll.order});

    var optionNum;
    for (var opt of this.state.options) {
      optionNum = "Option" + count.toString()
      firebase
        .firestore()
        .collection(code)
        .doc(this.state.poll.title)
        .collection('results')
        .doc(optionNum)
        .set({
          name: "name of option",
          value: 0
        });
    }
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
