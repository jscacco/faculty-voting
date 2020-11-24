import React, {Component} from 'react';

import UserProvider from "./UserProvider";
import Login from './pages/Login';

class App extends Component {
  render(){
    return (
      <UserProvider>
        <Login />
      </UserProvider>
    );
  }
}

export default App;
