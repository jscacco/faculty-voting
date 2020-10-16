import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchHostRooms,
 				 deleteHostRoom,
			   addHostRoom }   from '../MockDataFunctions';

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
		console.log('here');
		const response = yield call(fetchHostRooms)
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
		const response = yield call(() => deleteHostRoom(action.room_id))
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
		const response = yield call(addHostRoom);
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
