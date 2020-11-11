import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';
import { Colors }           from '../components/theme/Colors';

import history              from '../history';

import LoginCard            from '../components/cards/LoginCard';

import {userIsLoggedIn, userLogin, signOutCurrentUser, getCurrentUserEmail, userIsHamiltonian } from '../LoginUtils.js';

const LoginWrapper = styled.div`
  width: ${({width}) => width};
`;

const userLoginHandler = async () => {
    await userLogin().then(() => {
	if (!userIsHamiltonian()) {
	    console.log("User " + getCurrentUserEmail() + " is not within Hamilton domain. Logging out.");
	    alert("Please log in with a Hamilton account. (And enable pop-ups so the new login window appears)");
	    signOutCurrentUser();
	    userLoginHandler();
	} else {
	    pushLandingPage("user");
	}
    });
}

const hostLoginHandler = async () => {
    await userLogin().then(() => {
	if (!userIsHamiltonian()) {
	    console.log("User " + getCurrentUserEmail() + " is not within Hamilton domain. Logging out.");
	    alert("Please log in with a Hamilton account. (And enable pop-ups so the new login window appears)");
	    signOutCurrentUser();
	    hostLoginHandler();
	} else {
	    pushLandingPage("host");
	}
    });
}

const pushLandingPage = async (userOrHost) => {
    if (userIsLoggedIn() && userIsHamiltonian()) {
	if (userOrHost == "user") {
	    history.push('/RoomCode');
	} else {
	    history.push('/HostDash');
	}
    } else {
	console.log("Nobody is logged in, but new page was attempted to be loaded. User probably closed pop-up");
    }
}

const LoginComponent = ( props ) => {

  let width;
  let size = {};
  switch (props.viewport) {
    case 'smallDesktop':
      width = `75%`;
      size.small = true;
      break;
    case 'tablet':
      width = `100%`;
      size.small = true;
      break;
    case 'mobile':
    case 'smallMobile':
      width = `100%`
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      width = `50%`
      size.medium = true;
      break;
    default:
      width = `50%`
      size.small = true;
  }

  return (
    <LoginWrapper width={width}>
      <LoginCard onUserLogin={userLoginHandler}
                 onHostLogin={hostLoginHandler}
                 viewport={props.viewport}
                 {...size}/>
    </LoginWrapper>
  )
}

const LoginPage = ( props ) => {

  console.log(props)

  return (
    <ViewportHandler>
      <MainPage color={Colors.Blue}>
          <LoginComponent/>
      </MainPage>
    </ViewportHandler>
  )
};

export default LoginPage;
