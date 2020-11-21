import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchAgenda }   from '../../databaseCommunication/pollFunctions';
import { getUserId }     from '../../LoginUtils';

export function* fetchUserAgenda (action) {

	try {
		yield call(getUserId); //check if viewing access
		                                          // host_id
		const response = yield call(() => fetchAgenda(null, action.room_id))
		console.log(response);
		yield put({
			type: ActionTypes.useragenda.FETCH_AGENDA_SUCCESS,
			response
		});

	} catch(error) {
		console.log('error')
		yield put({
			type: ActionTypes.useragenda.FETCH_AGENDA_ERROR,
      error
		});

	}
};
