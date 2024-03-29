import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import UserProvider from "./UserProvider";

import { connect }          from 'react-redux';

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

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                  <Route path="/" exact component={Login}/>
                  <Route path="/Login" exact component={Login}/>
                  <Route path="/HostDash" exact component={HostDash}/>
                  <Route path="/Roomcode" exact component={Roomcode}/>
                  <Route path="/HostAgenda/:roomcode" exact component={HostAgenda}/>
                  <Route path="/UserAgenda/:roomcode" exact component={UserAgenda}/>
                  <Route path="/HostPoll/:roomcode/:pollcode" exact component={HostPoll}/>
                  <Route path="/UserPoll/:roomcode/:pollcode" exact component={UserPoll}/>
                  <Route path="/PollResults/:roomcode/:pollcode" exact component={PollResults}/>
                  <Route path="/RoomResults/:roomcode" exact component={RoomResults}/>
                  <Route path="/PrivacyPolicy" exact component={PrivacyPolicy}/>
                  <Route path="/:" exact component={Login}/>
            </Switch>
        )
    }
}
