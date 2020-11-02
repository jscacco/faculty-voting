import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
//import { fetchAgenda }   from '../MockDataFunctions';
import { fetchAgenda } 		  from '../../databaseCommunication/pollFunctions';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* fetchUserAgenda (action) {

	try {
		console.log('here');
		const response = yield call(() => fetchAgenda('dubin', action.room_id))
		console.log(response);
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
