import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchPollData,
 				 updatePollStatus }   from '../MockDataFunctions';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* fetchHostPoll (action) {

	try {
		console.log('here');
		const response = yield call(() => fetchPollData(action.room_id, action.poll_id))
		console.log(response);
		yield put({
			type: ActionTypes.hostpoll.FETCH_POLL_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostpoll.FETCH_POLL_ERROR,
      error
		});

	}
};

export function* changePollStatusPoll (action) {

	try {
		console.log('here');
		const response = yield call(() => updatePollStatus(action.room_id, action.poll_id, action.status))
	  const poll = response.polls[action.poll_id];
    console.log(response);
		yield put({
			type: ActionTypes.hostpoll.UPDATE_POLL_STATUS_SUCCESS,
			poll
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostpoll.UPDATE_POLL_STATUS_ERROR,
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
// export function* addRoom (action) {
//
// 	try {
// 		const response = yield call(addHostRoom);
// 		console.log(response);
// 		yield put({
// 			type: ActionTypes.hostdash.ADD_ROOM_SUCCESS,
// 			response
// 		});
//
// 	} catch(error) {
//
// 		yield put({
// 			type: ActionTypes.hostdash.ADD_ROOM_ERROR,
//       error
// 		});
//
// 	}
// };
