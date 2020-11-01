import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import MainPage             from './format-pages/BasePage';
import { Colors }           from '../components/theme/Colors';

import history              from '../history';

import LoginCard            from '../components/cards/LoginCard';

import {userLogin, signOutCurrentUser, getCurrentUserEmail, userIsHamiltonian } from '../LoginUtils.js';


const LoginWrapper = styled.div`
  width: 50%;
`;

const userLoginHandler = async () => {
    await userLogin().then(() => {
	console.log(userIsHamiltonian());
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
	console.log(userIsHamiltonian());
	if (!userIsHamiltonian()) {
	    console.log("User " + getCurrentUserEmail() + " is not within Hamilton domain. Logging out.");
	    alert("Please log in with a Hamilton account. (And enable pop-ups so the new login window appears)");
	    signOutCurrentUser();
	    userLoginHandler();
	} else {
	    pushLandingPage("host");
	}
    });
}

const pushLandingPage = async (userOrHost) => {
    if (userOrHost == "user") {
	history.push('/RoomCode');
    } else {
	history.push('/HostDash');
    }
}

const LoginPage = ( props ) => {

  return (
    <MainPage color={Colors.LightBlue}>
        <LoginWrapper>
          <LoginCard onUserLogin={userLoginHandler}
                     onHostLogin={hostLoginHandler}/>
        </LoginWrapper>
    </MainPage>
  )
};

export default LoginPage;
