import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchAgenda } 		  from '../../databaseCommunication/pollFunctions';

export function* fetchUserAgenda (action) {

	try {
		const response = yield call(() => fetchAgenda('dubin', action.room_id))
		yield put({
			type: ActionTypes.agenda.FETCH_AGENDA_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.agenda.FETCH_AGENDA_ERROR,
      error
		});

	}
};
