import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchAgenda }   from '../../databaseCommunication/pollFunctions';

async function fetchAsync (func) {
	const response = await func();
	if (response) {
		return response;
	}

	throw new Error ('bad');
}

export function* fetchPolls (action) {

	try {
		console.log('here');
		//                       changed function      host_id
		const response = yield call( () => fetchAgenda('dubin', action.roomcode))
		console.log(response);
		yield put({
			type: ActionTypes.meetingroom.FETCH_POLLS_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.meetingroom.FETCH_POLLS_ERROR,
      error
		});

	}
};

// export function* submitPoll (action) {
//
// 	try {
// 		const response = yield fetchAsync(() => {
// 			// submission to firebase
//
// 			let newPoll = {...data.polls[action.poll_id]};
// 			newPoll.submission = action.submission;
// 			data.polls[action.poll_id] = newPoll
// 			return data.polls[action.poll_id].submission;
// 		});
//
// 		yield put({
// 			type: ActionTypes.SUBMIT_POLL_SUCCESS,
// 			response
// 		});
//
// 	} catch(error) {
//
// 		yield put({
// 			type: ActionTypes.SUBMIT_POLL_ERROR,
//       error
// 		});
//
// 	}
// };
