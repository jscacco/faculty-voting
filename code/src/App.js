import React, {Component} from 'react';
import Poll from './pages/Poll';
import Body from './components/theme/Body';
import {Jumbo} from './components/theme/Jumbo';
import { Colors } from './components/theme/Colors';
// import RoomCode from './pages/RoomCode';

import VotingCard from './components/cards/VotingCardBase';
import OptionGroup  from './components/options/OptionGroup';
// import MultipleChoiceGroup  from './components/options/MultipleChoiceGroup';

import TextOption from './components/options/TextOption';
import InputOption from './components/options/InputOption';

import Button from './components/buttons/Button';
import Icon   from './components/theme/Icon';
import AgendaItem from './components/items/AgendaItem';
import HostControlPanel from './components/cards/HostControlPanel';


// <Poll id={0}/>



// <OptionGroup updateSelected={(selected) => console.log(selected)} type={'multiple'} fontColor={Colors.Blue} medium>
//   <TextOption fontColor={Colors.Green}>
//     test
//   </TextOption>
//   <TextOption>
//     test
//   </TextOption>
//   <InputOption placeholder={'someshit'} fontColor={Colors.Green} borderColor={Colors.Green}/>
//   <InputOption placeholder={'dif'} borderColor={Colors.Blue}/>
// </OptionGroup>

const options = [{type:'text', value:'Option 1'},
                 {type:'text', value:'Option 2'}];

const poll = {
  title: 'title',
  description: 'des',
  options: options,
  status: 'open'
}

// <Poll pollId={0}/>
// <SubmissionIcons submission={[true, false, true]}

class App extends Component {
  render(){
    return (
      <HostControlPanel title={'Poll Builder'} medium options={['', '']}/>
    );
  }
}

export default App;
