import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { getRoomResults }   from '../MockDataFunctions';

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
		console.log('here');
		const response = yield call(() => getRoomResults(action.room_id))
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
