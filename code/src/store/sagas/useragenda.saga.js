import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchAgenda }   from '../../databaseCommunication/pollFunctions';
import { getUser, getUserId }     from '../../LoginUtils';

export function* fetchUserAgenda (action) {

	try {
		const user = yield call(getUser)
		console.log(user)
		// yield call(getUserId); //check if viewing access
		const response = yield call(() => fetchAgenda(null, action.room_id))
		yield put({
			type: ActionTypes.useragenda.FETCH_AGENDA_SUCCESS,
			response
		});

	} catch(error) {
		yield put({
			type: ActionTypes.useragenda.FETCH_AGENDA_ERROR,
      error
		});

	}
};
