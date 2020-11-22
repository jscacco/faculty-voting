import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { checkRoomcode }   from '../../databaseCommunication/roomFunctions';


export function* validateRoomcode (action) {

	try {
		const response = yield call(() => checkRoomcode(action.room_id))
		yield put({
			type: ActionTypes.roomcode.CHECK_ROOMCODE_SUCCESS,
			response
		});

	} catch(error) {
		yield put({
			type: ActionTypes.roomcode.CHECK_ROOMCODE_ERROR,
      error
		});

	}
};
