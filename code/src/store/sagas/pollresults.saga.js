import { call, put }     		from "redux-saga/effects";
import ActionTypes       		from '../actionTypes';
import { getPollResults }   from '../../databaseCommunication/pollFunctions';
import { getUserId }				from '../../LoginUtils';


export function* fetchPollResults (action) {

	try {
		const user_id = getUserId();
		const response = yield call(() => getPollResults(user_id, action.room_id, action.poll_id))
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
