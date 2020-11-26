import React, { Component, createContext } from "react";
import firebase from "./databaseCommunication/permissions";

export const UserContext = createContext(null);
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
    // console.log(this.state.user)
  }
  render() {

    console.log('render')
    console.log(this.state.user)
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
