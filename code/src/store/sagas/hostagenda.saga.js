import { select, call, put }     												from "redux-saga/effects";
import ActionTypes       																from '../actionTypes';
import { fetchAgenda, addPoll, updatePollStatus } 		  from '../../databaseCommunication/pollFunctions';
import { updateRoom, updateRoomStatus } 		  					from '../../databaseCommunication/roomFunctions';
import { getUserId, userIsHostOfRoom } 									from '../../LoginUtils';


export function* fetchHostAgenda (action) {

	try {
		const user_id = yield call(getUserId);
		const response = yield call(() => fetchAgenda(user_id, action.room_id))

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
		const user_id = yield call(userIsHostOfRoom, action.room_id);
		                                          // host_id
		const response = yield call(() => updateRoom(user_id, action.room_id, {...roomState}))
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
export function* addRoomPoll (action) {

	try {
		const user_id = yield call(userIsHostOfRoom, action.room_id);
		                                       // host_id
		const response = yield call(() => addPoll(user_id, action.room_id));
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
		const user_id = yield call(userIsHostOfRoom, action.room_id);
		                                                // host_id
		const response = yield call(() => updatePollStatus(user_id, action.room_id,
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

export function* changeRoomStatus (action) {

	try {
		const user_id = yield call(userIsHostOfRoom, action.room_id);
		const response = yield call(() => updateRoomStatus(user_id, action.room_id, action.newStatus ));
		yield put({
			type: ActionTypes.hostagenda.UPDATE_ROOM_STATUS_SUCCESS,
			response
		});

	} catch(error) {

		yield put({
			type: ActionTypes.hostagenda.UPDATE_ROOM_STATUS_ERROR,
      error
		});

	}
};
