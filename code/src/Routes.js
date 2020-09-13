import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Main from "./pages/Main"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Main" exact component={Main} />
                </Switch>
            </Router>
        )
    }
}
