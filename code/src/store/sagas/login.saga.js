import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { userLogin, signOutCurrentUser, userIsHamiltonian } from '../../LoginUtils.js';


const loginHandler = async () => {
    await userLogin().then(() => {
    	if (! userIsHamiltonian()) {
          throw Error('Not a valid email.')
    	}
    });
}

export function* loginHost (action) {

	try {

    yield call(loginHandler);
		yield put({
			type: ActionTypes.login.HOST_LOGIN_SUCCESS,
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

  		yield put({
  			type: ActionTypes.login.USER_LOGIN_SUCCESS,
  		});

  	} catch(error) {
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
