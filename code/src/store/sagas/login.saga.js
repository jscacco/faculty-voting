import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { getUser, setPersistence, userLogin, signOutCurrentUser, userIsHamiltonian } from '../../LoginUtils.js';

import firebase from '../../databaseCommunication/permissions.js'
const fireauth = firebase.auth();


const loginHandler = async () => {

}

export function* loginHost (action) {

	try {

		// let user = yield call(getUser);
		// console.log(user)
		yield call(setPersistence);
		// console.log('here')
		yield call(userLogin, 'host');
		// console.log('success')
		//  user = yield call(getUser);
		// console.log(user)
		yield put({
			type: ActionTypes.login.HOST_LOGIN_SUCCESS,
		});

	} catch(error) {
		yield put({
			type: ActionTypes.login.HOST_LOGIN_ERROR,
      error
		});

	}
};

// const login_tester = ( provider ) => {
//   try
// }

export function* loginUser (action) {

  	try {
			// let user = yield call(getUser);
			// console.log(user)
      yield call(setPersistence);
      // console.log('here')
      yield call(userLogin, 'user');
      // console.log('success')
			//  user = yield call(getUser);
			// console.log(user)
  		yield put({
  			type: ActionTypes.login.USER_LOGIN_SUCCESS,
  		});

  	} catch(error) {
      console.log(error)
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
		});

	} catch(error) {
		yield put({
			type: ActionTypes.login.LOGOUT_ERROR,
      error
		});

	}
};
