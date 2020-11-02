import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { checkRoomcode }   from '../../databaseCommunication/roomFunctions';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* validateRoomcode (action) {

	try {
	console.log('here')
													 // host_id
		const response = yield call(() => checkRoomcode(action.room_id))
		yield put({
			type: ActionTypes.roomcode.CHECK_ROOMCODE_SUCCESS,
			response
		});

	} catch(error) {
    console.log('here')
		yield put({
			type: ActionTypes.roomcode.CHECK_ROOMCODE_ERROR,
      error
		});

	}
};
