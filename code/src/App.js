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
          TEsts asdf
        </Jumbo>
      </div>
    );
  }
}

export default App;
