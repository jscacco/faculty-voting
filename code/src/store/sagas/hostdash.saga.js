import { call, put, select }     					from "redux-saga/effects";
import ActionTypes       					from '../actionTypes';
import { fetchHostRooms,
		 deleteHostRoom,
		 addHostRoom }	 							from '../../databaseCommunication/roomFunctions';
import { getUserId,
         userIsHostOfRoom } 			from '../../LoginUtils';

const userSelector = ( state ) => {
	return { user: state.app.user,
					 loading: state.user.app,
	       }
}

const collectUserId = ( user ) => {
	if (!user) { throw Error('Not logged in.') }

	let email = user.email;
	return email.split('@')[0];
}

export function* fetchRooms (action) {

	try {
		const user= yield select(userSelector);
		console.log('here')
		const user_id = yield call(collectUserId, user);
		console.log(user_id)
		const response = yield call(fetchHostRooms, user_id);
		yield put({
			type: ActionTypes.hostdash.FETCH_ROOMS_SUCCESS,
			response
		});

	} catch(error) {
		yield put({
			type: ActionTypes.hostdash.FETCH_ROOMS_ERROR,
      		error
		});

	}
};

export function* deleteRoom (action) {

	try {
		const user_id = yield call(userIsHostOfRoom, action.room_id);
		const response = yield call(() => deleteHostRoom(user_id, action.room_id))
		yield put({
			type: ActionTypes.hostdash.DELETE_ROOM_SUCCESS,
			response
		});

	} catch(error) {
		yield put({
			type: ActionTypes.hostdash.DELETE_ROOM_ERROR,
      		error
		});

	}
};

export function* addRoom (action) {

	try {
		const user_id = yield call(getUserId);
		                                      // host_id
		const response = yield call(addHostRoom, user_id);
		yield put({
			type: ActionTypes.hostdash.ADD_ROOM_SUCCESS,
			response
		});

	} catch(error) {
		yield put({
			type: ActionTypes.hostdash.ADD_ROOM_ERROR,
      		error
		});

	}
};
