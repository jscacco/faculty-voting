import React, {Component} from 'react';
import styled             from 'styled-components'

import { Colors }       from './components/theme/Colors';

import DemoNavBar       from './components/DebuggingComponents/DemoNavBar';

import Login from './pages/Login';
import HostDash from './pages/HostDash';
import HostAgenda from './pages/HostAgenda';
import UserAgenda from './pages/UserAgenda';
import HostPoll   from './pages/HostPoll';
import UserPoll   from './pages/UserPoll';

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
  padding-left: 250
`;

class App extends Component {


  render(){

    return (
      <Login />
    );
  }
}

export default App;
