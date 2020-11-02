import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
//import { getPollResults }   from '../MockDataFunctions';
import { getPollResults }   from '../../databaseCommunication/pollFunctions';
import { getUserId }				from '../../LoginUtils';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* fetchPollResults (action) {

	try {
		console.log('here');
		const user_id = getUserId();
		const response = yield call(() => getPollResults(user_id, action.room_id, action.poll_id))
		console.log(response);
		yield put({
			type: ActionTypes.pollresults.FETCH_RESULTS_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.pollresults.FETCH_RESULTS_ERROR,
      error
		});

	}
};
