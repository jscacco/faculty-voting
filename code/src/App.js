import React, {Component} from 'react';
import Login from './pages/Login';
import UserProvider from "./UserProvider";
import Routes from "./Routes";

import Firebase   from './databaseCommunication/permissions'

import { connect }          from 'react-redux';
import ActionTypes          from './store/actionTypes';

class App extends Component {

  componentDidMount () {
    Firebase.auth().onAuthStateChanged( userAuth => {
      console.log('trigger');
      console.log(userAuth)
      this.props.onUpdateAuth(userAuth);
    })
  }

  render(){
    // return (
    //   <UserProvider>
    //     <Login />
    //   </UserProvider>
    // );
    return (
        <Routes/>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    user: state.app.user,
    loading: state.app.loading,
    error: state.app.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateAuth: ( user ) => dispatch({ type: ActionTypes.app.UPDATE_USER,
                                          user }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
