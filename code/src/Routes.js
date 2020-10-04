import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Poll from "./pages/Poll"
import RoomCode from "./pages/RoomCode"
import MeetingRoom from "./pages/MeetingRoom"
import SignIn from "./pages/SignIn"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Poll" exact component={Poll} />
                    <Route path="/RoomCode" exact component={RoomCode} />
                    <Route path="/MeetingRoom" exact component={MeetingRoom} />
                    <Route path="/SignIn" exact component={SignIn} />
                </Switch>
            </Router>
        )
    }
}
