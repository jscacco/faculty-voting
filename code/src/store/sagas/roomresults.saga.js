import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { getRoomResults }   from '../../databaseCommunication/roomFunctions';
import { getUserId }				from '../../LoginUtils';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* fetchRoomResults (action) {

	try {
		//console.log('here');
		const user_id = yield getUserId();
		console.log(user_id);
		const response = yield call(() => getRoomResults(user_id, action.room_id))
		console.log(response);
		yield put({
			type: ActionTypes.roomresults.FETCH_RESULTS_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.roomresults.FETCH_RESULTS_ERROR,
      error
		});

	}
};
