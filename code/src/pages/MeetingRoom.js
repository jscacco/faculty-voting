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
    super(props)

    this.state = {
      loading: true,
      allPolls: null
    }
  }

  async componentDidMount() {
    await this.fetchPolls().then((result) => this.setState({ allPolls: result.result }))
  }

  async fetchPolls() {
    return new Promise((resolve, reject) =>{
      let polls = getAllPolls('123')
      setTimeout(() => {
        this.setState({
          allPolls: polls,
          loading: false
        })
      }, 2000)
    })
  }

  render() {
    console.log("Meeting room rendering...")
    console.log("Agenda:")
    console.log(this.state.allPolls)
    if (this.state.allPolls && this.state.allPolls.result) console.log(this.state.allPolls.result.length)

    return !this.state.allPolls ?
    (
      <span> Loading... </span>
    ) :
    (
      <PageWrapper>
        <Agenda width={450} polls={this.state.allPolls}/>
      </PageWrapper>
    )
  }
}


export default MeetingRoomScreen;


/*


class MeetingRoomScreen extends React.Component {
  constructor(props) {
    super(props);
    var order = 1;
    this.state = {
      // State values for creating a new poll
      options: ['', ''],
      numOptions: 2,
      pollTitle: '',
      pollDescription: '',
      showResults: true,
      poll: new PollItem(),

      // State for the meeting agenda
      agenda: null
    }
    this.state.poll.setOrder(order);

    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)

  }


  componentDidMount() {
    this.setState({
      agenda: getAllPolls(code)
    })
  }


  addOption = () => {
    this.setState({
      numOptions: this.state.numOptions + 1,
      options: [...this.state.options, 'Option ' + this.state.numOptions]
    })
  }


  handleTitleChange = (event) => {
    this.setState({
      pollTitle: event.target.value
    })
    this.state.poll.setTitle(event.target.value)
  }


  handleDescriptionChange = (event) => {
    this.setState({
      pollDescription: event.target.value
    })
    this.state.poll.setDescription(event.target.value)
  }


  handleOptionChange = (event, index) => {
    let newOptions = this.state.options;
    const newOption = {...newOptions[index],
                       value: event.target.value};
    newOptions[index] = newOption;
  }


  handleCreatePoll = () => {
    if(this.state.pollTitle != '') {
      for(var i = 0; i < this.state.options.length; i++) {
        var opt = {}
        opt[this.state.options[i].value] = 0
        this.state.poll.addOption(opt)
      }

      this.state.poll.setType('single')

      addPollFire(code, this.state.poll)

      this.setState({
        options: ['', ''],
        numOptions: 2
      })
    }
  }


  render() {
    console.log('AGENDA ')
    console.log(this.state.agenda)

    return this.state.agenda ? (
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
      ) : (
        <span> Loading agenda... </span>
      )


  }

};

export default MeetingRoomScreen;
*/
