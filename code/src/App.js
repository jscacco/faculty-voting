import React, {Component} from 'react';
import Poll from './pages/Poll';
import Body from './components/theme/Body';
import {Jumbo} from './components/theme/Jumbo';
import { Colors } from './components/theme/Colors';
// import RoomCode from './pages/RoomCode';


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
      <Poll />
    );
  }
}

export default App;
