import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import history              from '../history';
import HostControlPanel     from '../components/HostControlPanel';
import Input            from '../components/inputs/Input'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
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
      options: [],
      pollTitle: '',
      pollDescription: ''
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

    console.log('New title: ' + this.state.pollTitle)
  }

  handleDescriptionChange = (event) => {
    this.setState({
      pollDescription: event.target.value
    })

    console.log('New Desc: ' + this.state.pollDescription)
  }

  handleOptionChange = (event) => {
    console.log('Option value being changed')

    console.log(event.target.value)
    for (const component of this.state.optionComponents) {
      console.log(component.value)
    }
  }

  handleCreatePoll = () => {
    alert('Creating poll ' + this.state.description + ' ' + this.state.description)
  }

  render() {
    return (
      <PageWrapper>
        <HostControlPanel width={300} title="Create a Poll"
                          handleSubmit={this.handleCreatePoll}
                          handleCreateOption={this.addOption}
                          handleOptionChange={this.handleOptionChange}
                          handleTitleChange={this.handleTitleChange}
                          handleDescriptionChange={this.handleDescriptionChange}
                          options={this.state.optionComponents} />
      </PageWrapper>
    );
  }

};

export default MeetingRoomScreen;
