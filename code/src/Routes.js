import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Main from "./pages/Main"
import RoomCode from "./pages/RoomCode"
import MeetingRoom from "./pages/MeetingRoom"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Main" exact component={Main} />
                    <Route path="/RoomCode" exact component={RoomCode} />
                    <Route path="/MeetingRoom" exact component={MeetingRoom} />
                </Switch>
            </Router>
        )
    }
}
