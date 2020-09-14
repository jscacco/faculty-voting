import React, {Component} from 'react';
import Main from './pages/Main';
import Body from './components/theme/Body';
import {Jumbo} from './components/theme/Jumbo';
import { Colors } from './components/theme/Colors';
import RoomCode from './pages/RoomCode';
import firebase from './firebase';

// <div>
//   <Jumbo color={Colors.Blue} small>
//     This is the jumbo text, used for headers and such...
//   </Jumbo>
//   <Body color={Colors.Red} large>
//     This is the body, used for everything else! Note that sizing can change.
//   </Body>
// </div>

class App extends Component {
  render(){
    return (
      <RoomCode />
    );
  }
}

export default App;
