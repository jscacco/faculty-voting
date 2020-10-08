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
import AgendaCardBase       from './components/cards/AgendaCardBase';
import Jumbo            from './components/theme/Jumbo';


import Card          from './components/cards/Card';

// const PageWrapper = styled.div`
// background-color: ${Colors.LightBlue};
// position: absolute;
// right: 0;
// left: 0;
// top: 0;
// bottom: 0;
// `;

const open = { title: 'Generic Poll Title', status: 'open'};
const pending = { title: 'Generic Poll Title', status: 'pending'};
const closed = { title: 'Generic Poll Title', status: 'closed'};

// <HostRooms medium openRooms={[open, open]} pendingRooms={[pending,pending,pending]} closedRooms={[closed]}/>

const PageWrapper = styled.div`
  background-color: ${Colors.White};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  position: fixed;
  overflow: auto;
  height: 100vh;
`;

class App extends Component {


  render(){

    let header = (<Jumbo twoExtraSmall color={Colors.White}>Agenda</Jumbo>);
    let pollSection = (
      <>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      <Jumbo extraSmall color={Colors.White}>Poll!</Jumbo>
      </>
    )

    return (
      <PageWrapper>
      <AgendaCardBase header={header} pollComponents={pollSection}/>
      </PageWrapper>
    );
  }
}

export default App;
