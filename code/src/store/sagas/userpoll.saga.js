import { call, put, select }     				from "redux-saga/effects";
import ActionTypes       								from '../actionTypes';
import { fetchPollData, submitVote }   	from '../../databaseCommunication/pollFunctions';
import { getUserId, userIsVoter }				from '../../LoginUtils';


export function* fetchUserPoll (action) {

	try {
		const user_id = yield call(getUserId)
		const response = yield call(() => fetchPollData(null, action.room_id, action.poll_id))
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
		const user_id = yield call(userIsVoter);

		const currentPoll = yield select(pollSelector);
		const response = yield call(() => submitVote(user_id, action.room_id, action.poll_id,
			                                           currentPoll.selection, currentPoll.submission, currentPoll.userInput))
		//console.log(response);
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
