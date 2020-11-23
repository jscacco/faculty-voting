import { call, put, select }     from "redux-saga/effects";
import ActionTypes       from '../actionTypes';
import { fetchPollData, updatePoll, updatePollStatus }   from '../../databaseCommunication/pollFunctions';
import { userIsHostOfRoom } 			from '../../LoginUtils';


export function* fetchHostPoll (action) {

	try {
		const user_id = yield call(userIsHostOfRoom, action.room_id)

		const response = yield call(() => fetchPollData(user_id, action.room_id, action.poll_id))
		yield put({
			type: ActionTypes.hostpoll.FETCH_POLL_SUCCESS,
			response,
      		location_state: action.location_state
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostpoll.FETCH_POLL_ERROR,
      		error
		});

	}
};

const roomSelector = ( state ) => {
	return {...state.hostpoll.poll}
}

export function* updateHostPoll (action) {

	try {
		const user_id = yield call(userIsHostOfRoom, action.room_id)

    	const pollState = yield select(roomSelector);
		const response = yield call(() => updatePoll(user_id, action.room_id, action.poll_id, pollState))
		yield put({
			type: ActionTypes.hostpoll.UPDATE_POLL_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostpoll.UPDATE_POLL_ERROR,
      		error
		});

	}
};

export function* changePollStatusPoll (action) {

	try {
		const user_id = yield call(userIsHostOfRoom, action.room_id)

		const response = yield call(() => updatePollStatus(user_id, action.room_id, action.poll_id, action.status))
	 	const poll = response.polls[action.poll_id];

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
