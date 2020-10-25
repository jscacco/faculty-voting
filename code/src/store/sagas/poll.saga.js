import { call, put }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import data from '../mockData';
import { fetchPollData }   from '../../databaseCommunication/pollFunctions';

async function fetchAsync (func) {
	const response = await func();
	if (response) {
		return response;
	}

	throw new Error ('bad');
}

export function* fetchPoll (action) {

	try {
		const response = yield fetchAsync(() => {
			// go to firebase and get info
			// added function call host_id  room_id
			return fetchPollData('dubin', 'Room2', action.poll_id) //data.polls[action.poll_id].data})
		});
		yield put({
			type: ActionTypes.FETCH_POLL_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.FETCH_POLL_ERROR,
      error
		});

	}
};

export function* submitPoll (action) {

	try {
		const response = yield fetchAsync(() => {
			// submission to firebase

			let newPoll = {...data.polls[action.poll_id]};
			newPoll.submission = action.submission;
			data.polls[action.poll_id] = newPoll
			return data.polls[action.poll_id].submission;
		});

		yield put({
			type: ActionTypes.SUBMIT_POLL_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.SUBMIT_POLL_ERROR,
      error
		});

	}
};




// export const fetchPollSuccess = ( poll ) => {
//     return {
//         type: actionTypes.FETCH_POLL_SUCCESS,
//         poll: poll
//     };
// };
//
// export const fetchPollFail = ( error ) => {
//     return {
//         type: actionTypes.FETCH_POLL_FAIL,
//         error: error
//     };
// };
//
// export const fetchPollStart = () => {
//     return {
//         type: actionTypes.FETCH_POLL_START
//     };
// };
//
// export const fetchPoll = () => {
//     return dispatch => {
//         dispatch(fetchPollStart());
//         const poll = data.poll;
//         if (poll){
//           dispatch(fetchPollSuccess(poll))
//         }
//         else {
//           dispatch(fetchPollFail('error'))
//         };
//     };
// };
