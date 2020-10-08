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
// import AgendaCardBase       from './components/cards/AgendaCardBase';
import PollCardBase         from './components/cards/PollCardBase';
import Jumbo            from './components/theme/Jumbo';
import Body             from './components/theme/Body';
import Button           from './components/buttons/Button';

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

const ComponentWrapper = styled.div`
  height: 80%;
  width: 60%;
`;

class App extends Component {


  render(){

    let title = (
      <Jumbo twoExtraSmall color={Colors.White}>Poll Title</Jumbo>
    )
    let description = (
      <Body extraSmall color={Colors.White}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur erat justo, laoreet ut eros et, fermentum dictum neque. In enim orci, molestie ac dui quis, vehicula hendrerit odio. Vestibulum ut enim molestie, sagittis dolor a, rutrum enim. Etiam ultricies nunc tortor, cursus lobortis ante bibendum eget. Nunc tincidunt feugiat massa a efficitur. Donec ut imperdiet lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent magna risus, lobortis sit amet urna sit amet, pulvinar facilisis quam. Cras finibus urna venenatis lorem dignissim fringilla. Cras elementum nisi a dui hendrerit interdum. Duis ut ullamcorper massa.
      </Body>
    )
    let optionGroup = (
      <>
        <Jumbo extraSmall color={Colors.Charcol}>Option 1</Jumbo>
        <Jumbo extraSmall color={Colors.Charcol}>Option 2</Jumbo>
        <Jumbo extraSmall color={Colors.Charcol}>Option 3</Jumbo>
        <Jumbo extraSmall color={Colors.Charcol}>Option 4</Jumbo>
      </>
    )
    let button = (
      <Button> I am a Button!</Button>
    )
    let statusText = (
      <p>Button Status</p>
    )

    return (
      <PageWrapper>
        <ComponentWrapper>
          <PollCardBase title={title} description={description} optionGroup={optionGroup} button={button} statusText={statusText}/>
        </ComponentWrapper>
      </PageWrapper>
    );
  }
}

export default App;

/*
Testing variables

AgendaCardBase:
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
let footer = (<p>Footer</p>)


*/
