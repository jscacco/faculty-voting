import React, {Component} from 'react';
import styled           from 'styled-components';

import Poll from './pages/Poll';
import Body from './components/theme/Body';
import {Jumbo} from './components/theme/Jumbo';
import { Colors } from './components/theme/Colors';
import RoomCode from './pages/RoomCode';

// import TextArea from './components/inputs/TextArea';
import CheckBox from './components/buttons/CheckBox';
import Select from './components/inputs/Select';
import InputOption from './components/options/InputOption';
import TextOption from './components/options/TextOption';
import OptionGroup from './components/options/OptionGroup';
import SingleChoiceGroup from './components/options/SingleChoiceGroup';
import VotingCard from './components/VotingCard';


// <div>
//   <Jumbo color={Colors.Blue} small>
//     This is the jumbo text, used for headers and such...
//   </Jumbo>
//   <Body color={Colors.Red} large>
//     This is the body, used for everything else! Note that sizing can change.
//   </Body>
// </div>

// <SingleChoiceGroup color={Colors.Blue} extraLarge>
//   <TextOption>
//     test
//   </TextOption>
//   <TextOption>
//     test
//   </TextOption>
//   <TextOption>
//     test
//   </TextOption>
// </SingleChoiceGroup>

class App extends Component {
  render(){
    return (
      <InputOption onChange={(event) => console.log(event.target.value)}/>
    );
  }
}

export default App;
