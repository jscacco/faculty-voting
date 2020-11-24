import React, { Component, createContext } from "react";
import firebase from "./databaseCommunication/permissions";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(userAuth => {
      console.log('trigger')
      console.log(userAuth)
      this.awaitSetState({ user: userAuth });
    });
  };

  awaitSetState = async ( newState) => {
    this.setState({ ...newState });
    console.log(this.state.user)
  }
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
