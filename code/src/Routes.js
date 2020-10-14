import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

// import Poll from "./pages/Poll"
// import RoomCode from "./pages/RoomCode"
// import MeetingRoom from "./pages/MeetingRoom"
import Login       from "./pages/Login"
import HostDash    from './pages/HostDash'
import HostAgenda       from "./pages/HostAgenda"
import UserAgenda    from './pages/UserAgenda'
import HostPoll       from "./pages/HostPoll"
import UserPoll    from './pages/UserPoll'
import EditPoll     from './pages/EditPoll'

import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Login" exact component={Login}/>
                    <Route path="/HostDash" exact component={HostDash}/>
                    <Route path="/HostAgenda" exact component={HostAgenda}/>
                    <Route path="/UserAgenda" exact component={UserAgenda}/>
                    <Route path="/HostPoll" exact component={HostPoll}/>
                    <Route path="/UserPoll" exact component={UserPoll}/>
                    <Route path="/EditPoll" exact component={EditPoll}/>
                </Switch>
            </Router>
        )
    }
}
