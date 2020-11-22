import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchAgenda }   from '../../databaseCommunication/pollFunctions';

export function* fetchPolls (action) {

	try {
		const response = yield call( () => fetchAgenda('dubin', action.roomcode))
		yield put({
			type: ActionTypes.meetingroom.FETCH_POLLS_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.meetingroom.FETCH_POLLS_ERROR,
      error
		});

	}
};
