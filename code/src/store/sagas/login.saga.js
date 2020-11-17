import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { userIsLoggedIn, userLogin, signOutCurrentUser, getCurrentUserEmail, userIsHamiltonian } from '../../LoginUtils.js';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

const loginHandler = async () => {
    await userLogin().then(() => {
    	if (! userIsHamiltonian()) {
          throw 'Not a valid email.'
    	    // console.log("User " + getCurrentUserEmail() + " is not within Hamilton domain. Logging out.");
    	    // alert("Please log in with a Hamilton account. (And enable pop-ups so the new login window appears)");
    	    // await signOutCurrentUser();
    	}
      // else {
    	//     pushLandingPage("user");
    	// }
    });
}

export function* loginHost (action) {

	try {

    yield call(loginHandler);
	// console.log('here')
													 // host_id
		// const response = yield call(() => checkRoomcode(action.room_id))
		yield put({
			type: ActionTypes.login.HOST_LOGIN_SUCCESS,
			// response
		});

	} catch(error) {
    console.log(error)
		yield put({
			type: ActionTypes.login.HOST_LOGIN_ERROR,
      error
		});

	}
};

export function* loginUser (action) {

  	try {

      yield call(loginHandler);
  	// console.log('here')
  													 // host_id
  		// const response = yield call(() => checkRoomcode(action.room_id))
  		yield put({
  			type: ActionTypes.login.USER_LOGIN_SUCCESS,
  			// response
  		});

  	} catch(error) {
      // console.log('here')
  		yield put({
  			type: ActionTypes.login.USER_LOGIN_ERROR,
        error
  		});

  	}
  };

export function* logout (action) {

	try {
	  yield call(signOutCurrentUser)
		yield put({
			type: ActionTypes.login.LOGOUT_SUCCESS,
			// response
		});

	} catch(error) {
    console.log('here')
		yield put({
			type: ActionTypes.login.LOGOUT_ERROR,
      error
		});

	}
};
