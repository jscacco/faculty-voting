import React, {Component} from 'react';
import Main from './pages/Main';
import Body from './components/typography/Body';
import {Jumbo} from './components/typography/Jumbo';
import { Colors } from './components/typography/Colors';

class App extends Component {
  render(){
    return (
      <div>
        <Jumbo color={Colors.Blue} small>
          This is the jumbo text, used for headers and such...
        </Jumbo>
        <Body color={Colors.Red} large>
          This is the body, used for everything else! Note that sizing can change.
        </Body>
      </div>
    );
  }
}

export default App;
