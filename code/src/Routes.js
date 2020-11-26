import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import UserProvider from "./UserProvider";

import Login       from "./pages/Login"
import HostDash    from './pages/HostDash'
import HostAgenda       from "./pages/HostAgenda"
import Roomcode from "./pages/Roomcode"
import UserAgenda    from './pages/UserAgenda'
import HostPoll       from "./pages/HostPoll"
import UserPoll    from './pages/UserPoll'
import PollResults from './pages/PollResults'
import RoomResults from './pages/RoomResults'
import PrivacyPolicy from './pages/PrivacyPolicy'


import history from './history';

const ProviderRoute = ( props ) => {
  // return (
  //   <UserProvider>
  //     <Route {...props}/>
  //   </UserProvider>
  // )
  return (
      <Route {...props}/>
  )
}

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                  <ProviderRoute path="/Login" exact component={Login}/>
                  <ProviderRoute path="/HostDash" exact component={HostDash}/>
                  <ProviderRoute path='/Roomcode' exact component={Roomcode}/>
                  <ProviderRoute path="/HostAgenda/:roomcode" exact component={HostAgenda}/>
                  <ProviderRoute path="/UserAgenda/:roomcode" exact component={UserAgenda}/>
                  <ProviderRoute path="/HostPoll/:roomcode/:pollcode" exact component={HostPoll}/>
                  <ProviderRoute path="/UserPoll/:roomcode/:pollcode" exact component={UserPoll}/>
                  <ProviderRoute path="/PollResults/:roomcode/:pollcode" exact component={PollResults}/>
                  <ProviderRoute path="/RoomResults/:roomcode" exact component={RoomResults}/>
                  <ProviderRoute path="/PrivacyPolicy" exact component={PrivacyPolicy}/>
                  <ProviderRoute path="/" exact component={Login}/>
            </Router>
        )
    }
}
