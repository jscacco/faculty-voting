import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg'

import { Colors }           from '../components/theme/Colors';
import RoomCodeForm         from '../components/RoomCodeForm';
import history              from '../history'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

class RoomCodeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('You are entering room: ' + this.state.value);
    history.push('/Main');
    event.preventDefault();
  }

  render() {
    return (
      <>
        <RoomCodeForm title="HamPolls" width={0} color={"transparen"} value={this.value} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <ParticlesBg type="random" bg={true} />
      </>
    );
  }
};

export default RoomCodeScreen;
