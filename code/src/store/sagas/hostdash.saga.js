import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchHostRooms,
		 deleteHostRoom,
		 addHostRoom }	 from '../dataFunctions';

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
							                     // host_id
		const response = yield call(fetchHostRooms, 'dubin');
		console.log(response);
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
		                							  // host_id
		const response = yield call(() => deleteHostRoom('dubin', action.room_id))
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
		                                      // host_id   room_title
		const response = yield call(addHostRoom, 'dubin', 'Room Title');
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
