import React, {Component} from 'react';
// import Poll from './pages/Poll';
// import Body from './components/theme/Body';
// import {Jumbo} from './components/theme/Jumbo';
// import { Colors } from './components/theme/Colors';
// import RoomCode from './pages/RoomCode'

// import LoginPage from './pages/Login';
// import HostRooms from './pages/HostRooms';

// <div>
//   <Jumbo color={Colors.Blue} small>
//     This is the jumbo text, used for headers and such...
//   </Jumbo>
//   <Body color={Colors.Red} large>
//     This is the body, used for everything else! Note that sizing can change.
//   </Body>
// </div>

import styled               from 'styled-components';
import { Colors }           from './components/theme/Colors';
// import StatusText           from './components/format/StatusText';
// import HostAgendaCard       from './components/cards/HostAgendaCard';
// import OptionGroupBase          from './components/option-groups/OptionGroupBase';
import TextOption   from './components/options/TextOption';
import EditOption from './components/options/EditOption';

import Card from './components/cards/Card';
import Jumbo from './components/theme/Jumbo';

import VotingOptionGroup from './components/option-groups/VotingOptionGroup';

const PageWrapper = styled.div`
background-color: ${Colors.LightBlue};
position: absolute;
right: 0;
left: 0;
top: 0;
bottom: 0;
`;

const open = { title: 'Generic Poll Title', status: 'open'};
const pending = { title: 'Generic Poll Title', status: 'pending'};
const closed = { title: 'Generic Poll Title', status: 'closed'};

// <HostRooms medium openRooms={[open, open]} pendingRooms={[pending,pending,pending]} closedRooms={[closed]}/>

// <OptionGroupBase large>
// <TextOption iconType={'checkbox'}>
//   Optoin 1
// </TextOption>
// </OptionGroupBase>

class App extends Component {
  render(){

    return (
      <VotingOptionGroup submittedOptions={[false, true]} type={'multiple'} medium>
        <TextOption>
          Optoin 1
        </TextOption>
        <TextOption>
          Optoin 2
        </TextOption>
      </VotingOptionGroup>
    );
  }
}

export default App;
