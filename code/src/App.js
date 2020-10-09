import React, {Component} from 'react';
import styled             from 'styled-components'

import { Colors }       from './components/theme/Colors'
import LoginPage from './pages/Login';
import HostDash from './pages/HostDash';
import HostAgenda from './pages/HostAgenda';
import UserAgenda from './pages/UserAgenda';

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
`;

class App extends Component {


  render(){

    return (
      <PageWrapper>
        <UserAgenda/>
      </PageWrapper>
    );
  }
}

export default App;
