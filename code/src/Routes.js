import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

// import Poll from "./pages/Poll"
// import RoomCode from "./pages/RoomCode"
// import MeetingRoom from "./pages/MeetingRoom"
import Login       from "./pages/Login"
import HostDash    from './pages/HostDash'
import history from './history';

// <Route path="/Poll" exact component={Poll} />
// <Route path="/RoomCode" exact component={RoomCode} />
// <Route path="/MeetingRoom" exact component={MeetingRoom} />
// <Route path="/Login" exact component={Login}/>

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Login" exact component={Login}/>
                    <Route path="/HostDash" exact component={HostDash}/>
                </Switch>
            </Router>
        )
    }
}
