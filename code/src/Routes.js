import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import { userIsLoggedIn }       from "./LoginUtils";

import Login       from "./pages/Login"
import HostDash    from './pages/HostDash'
import HostAgenda       from "./pages/HostAgenda"
import Roomcode from "./pages/Roomcode"
import UserAgenda    from './pages/UserAgenda'
import HostPoll       from "./pages/HostPoll"
import UserPoll    from './pages/UserPoll'
import PollResults from './pages/PollResults'
import RoomResults from './pages/RoomResults'


import history from './history';

const PrivateRoute = ( props ) => {
  const { component: Component, auth, ...rest } = props;

  return (
    <Route {...rest} render={props => {
      console.log(auth(rest));
      return (
      auth(rest) ?
      <Component {...props}/> :
      <Redirect to={{ pathname: "/Login" }} />
    )}}/>
  )
}

export default class Routes extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/Login" exact component={Login}/>
                    <PrivateRoute path="/HostDash" component={HostDash} auth={(props) => {console.log(userIsLoggedIn()); return userIsLoggedIn()}}/>
                    <Route path='/Roomcode' exact component={Roomcode}/>
                    <Route path="/HostAgenda/:roomcode" component={HostAgenda}/>
                    <Route path="/UserAgenda/:roomcode" exact component={UserAgenda}/>
                    <Route path="/HostPoll/:roomcode/:pollcode" exact component={HostPoll}/>
                    <Route path="/UserPoll/:roomcode/:pollcode" exact component={UserPoll}/>
                    <Route path="/PollResults/:roomcode/:pollcode" exact component={PollResults}/>
                    <Route path="/RoomResults/:roomcode" exact component={RoomResults}/>
                    <Route path="/:" exact component={Login}/>
                </Switch>
            </Router>
        )
    }
}
