import { select, call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchAgenda,
 				 updateRoom,
         addPoll,
         updatePollStatus }   from '../MockDataFunctions';

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

export const roomSelector = ( state ) => {
	return {
		status: state.hostagenda.status,
		title: state.hostagenda.title,
		polls: state.hostagenda.polls,
		order: state.hostagenda.order
	}
}

export function* updateHostAgenda (action) {

	try {
		const roomState = yield select(roomSelector);
		const response = yield call(() => updateRoom(action.room_id, {...roomState}))
		// console.log(response);
		yield put({
			type: ActionTypes.hostagenda.UPDATE_AGENDA_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostagenda.UPDATE_AGENDA_ERROR,
      error
		});

	}
}

// export function* deleteRoomPoll (action) {
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

export function* addRoomPoll (action) {

	try {
		const response = yield call(() => addPoll(action.room_id));
		yield put({
			type: ActionTypes.hostagenda.ADD_POLL_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostagenda.ADD_POLL_ERROR,
      error
		});

	}
};

export function* changePollStatus (action) {

	try {
		const response = yield call(() => updatePollStatus(action.room_id,
                                                       action.poll_id,
                                                       action.newStatus ));
		yield put({
			type: ActionTypes.hostagenda.UPDATE_POLL_STATUS_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostagenda.UPDATE_POLL_STATUS_ERROR,
      error
		});

	}
};
