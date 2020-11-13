import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchHostRooms,
		 deleteHostRoom,
		 addHostRoom }	 from '../../databaseCommunication/roomFunctions';
import { getUserId,
 				 userIsLoggedIn, userIsHostOfRoom } 			from '../../LoginUtils';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* fetchRooms (action) {

	try {
		const user_id = yield call(getUserId);
		console.log(user_id)
		if (!user_id) { console.log('here'); throw 'Not logged in'};

		// const user_id = getUserId();
		const response = yield call(fetchHostRooms, user_id);
		console.log(response);
		yield put({
			type: ActionTypes.hostdash.FETCH_ROOMS_SUCCESS,
			response
		});

	} catch(error) {
		console.log('here')
		yield put({
			type: ActionTypes.hostdash.FETCH_ROOMS_ERROR,
      error
		});

	}
};

export function* deleteRoom (action) {

	try {
		const user_id = getUserId();
		                							  // host_id
		const response = yield call(() => deleteHostRoom(user_id, action.room_id))
		console.log(response);
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
		console.log(user_id);
		                                      // host_id
		const response = yield call(addHostRoom, user_id);
		console.log(response);
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
