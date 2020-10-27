import { call, put, select }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchPollData,
 				 submitVote }   from '../MockDataFunctions';

// async function fetchAsync (func) {
// 	const response = await func();
// 	if (response) {
// 		return response;
// 	}
//
// 	throw new Error ('bad');
// }

export function* fetchUserPoll (action) {

	try {
		console.log('here');
		const response = yield call(() => fetchPollData(action.room_id, action.poll_id))
		console.log(response);
		yield put({
			type: ActionTypes.userpoll.FETCH_POLL_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.userpoll.FETCH_POLL_ERROR,
      error
		});

	}
};

export const pollSelector = ( state ) => {
	return {
		selection: state.userpoll.pollStatus.selection,
		submission: state.userpoll.pollStatus.submission,
		userInput: state.userpoll.userInput
	}
}

export function* sendVote (action) {

	try {
		const currentPoll = yield select(pollSelector);
		const response = yield call(() => submitVote(action.room_id, action.poll_id,
			                                           currentPoll.selection, currentPoll.submission, currentPoll.userInput))
		console.log(response);
		yield put({
			type: ActionTypes.userpoll.SUBMIT_VOTE_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.userpoll.SUBMIT_VOTE_ERROR,
      error
		});

	}
};
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
