import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchAgenda }   from '../MockDataFunctions';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* fetchHostAgenda (action) {

	try {
		// console.log('here');
		const response = yield call(() => fetchAgenda(action.room_id))
		// console.log(response);
		yield put({
			type: ActionTypes.hostagenda.FETCH_AGENDA_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostagenda.FETCH_AGENDA_ERROR,
      error
		});

	}
};

// export function* deleteRoom (action) {
//
// 	try {
// 		const response = yield call(() => deleteHostRoom(action.room_id))
// 		console.log(response);
// 		yield put({
// 			type: ActionTypes.hostdash.DELETE_ROOM_SUCCESS,
// 			response
// 		});
//
// 	} catch(error) {
//
// 		yield put({
// 			type: ActionTypes.hostdash.DELETE_ROOM_ERROR,
//       error
// 		});
//
// 	}
// };
//
// export function* addPoll (action) {
//
// 	try {
// 		const response = yield call(() => addHostPoll(action.roomcode));
// 		// console.log(response);
// 		yield put({
// 			type: ActionTypes.hostagenda.ADD_POLL_SUCCESS,
// 			response
// 		});
// 
// 	} catch(error) {
//
// 		yield put({
// 			type: ActionTypes.hostagenda.ADD_POLL_ERROR,
//       error
// 		});
//
// 	}
// };
