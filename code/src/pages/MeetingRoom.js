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
import addPollFire, { getAllPolls }          from '../FirebaseUtil'
import {getPollInf}          from '../FirebaseUtil';

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
      // optionComponents: [<Input placeholder={'Option'}
      //                           onChange={this.handleChange}/>,
      //                    <Input placeholder={'Option'}
      //                           onChange={this.handleChange}/>],
      options: ['', ''],
      numOptions: 2,
      pollTitle: '',
      pollDescription: '',
      showResults: true,
      poll: new PollItem(),
      agenda: getAllPolls(code)
    }
    this.state.poll.setOrder(order);

    this.handleOptionChange = this.handleOptionChange.bind(this)

    console.log(this.state.agenda)
  }

  addOption = () => {
    this.setState({
      // optionComponents: [...this.state.optionComponents,
      //                    <Input placeholder={'Option'}
      //                           onChange={this.handleOptionChange}/>]
      numOptions: this.state.numOptions + 1,
      options: [...this.state.options, 'Option ' + this.state.numOptions]
    })

    console.log('Option added')
    console.log(this.state.options.length)
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

  handleOptionChange = (event, index) => {
    console.log('Option value being changed')
    console.log(index)
    console.log(event.target.value)

    let newOptions = this.state.options;
    const newOption = {...newOptions[index],
                       value: event.target.value};
    newOptions[index] = newOption;
  }

  handleCreatePoll = () => {
    if(this.state.pollTitle != '') {
      alert('Creating poll ' + this.state.pollTitle + ' ' + this.state.pollDescription)

      for(var i = 0; i < this.state.options.length; i++) {
        var opt = {}
        opt[this.state.options[i].value] = 0
        this.state.poll.addOption(opt)
      }

      this.state.poll.setType('single')

      /*for(var opt in this.state.optionComponents) {
        console.log(opt.placeholder)
      }*/

      addPollFire(code, this.state.poll)
      //var newPoll = getPollInf(code, this.state.pollTitle)
      //newPoll.logData()
      //console.log(newPoll)
      console.log(getAllPolls(code))
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
                            options={this.state.options} />
          <Agenda polls={this.state.agenda} />
        </SideBySideWrapper>
      </PageWrapper>
    );
  }

};

export default MeetingRoomScreen;
