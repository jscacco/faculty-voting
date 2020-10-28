import { takeLatest, all }             from "redux-saga/effects";
import ActionTypes                from '../actionTypes';

import { validateRoomcode }   from './roomcode.saga'
import { fetchRooms,
         deleteRoom,
         addRoom }             from './hostdash.saga.js';
import { fetchUserAgenda }     from './useragenda.saga.js';
import { fetchHostAgenda, updateHostAgenda,
         addRoomPoll,
         changePollStatus,
         changeRoomStatus }     from './hostagenda.saga.js';
import { fetchUserPoll,
         sendVote }  from './userpoll.saga';
import { fetchHostPoll,
         updateHostPoll,
         changePollStatusPoll }  from './hostpoll.saga';
import { fetchPollResults } from './pollresults.saga';


// watcher saga: watches for actions dispatched to the store, starts worker saga

export function* watcherSaga() {
    yield takeLatest(ActionTypes.roomcode.CHECK_ROOMCODE_START, validateRoomcode);
    yield takeLatest(ActionTypes.hostdash.FETCH_ROOMS_START, fetchRooms);
    yield takeLatest(ActionTypes.hostdash.DELETE_ROOM_START, deleteRoom);
    yield takeLatest(ActionTypes.hostdash.ADD_ROOM_START, addRoom);
    yield takeLatest(ActionTypes.useragenda.FETCH_AGENDA_START, fetchUserAgenda);
    yield takeLatest(ActionTypes.hostagenda.FETCH_AGENDA_START, fetchHostAgenda);
    yield takeLatest(ActionTypes.hostagenda.ADD_POLL_START, addRoomPoll );
    yield takeLatest(ActionTypes.hostagenda.UPDATE_AGENDA_START, updateHostAgenda );
    yield takeLatest(ActionTypes.hostagenda.UPDATE_POLL_STATUS_START, changePollStatus );
    yield takeLatest(ActionTypes.hostagenda.UPDATE_ROOM_STATUS_START, changeRoomStatus );
    yield takeLatest(ActionTypes.userpoll.FETCH_POLL_START, fetchUserPoll );
    yield takeLatest(ActionTypes.hostpoll.FETCH_POLL_START, fetchHostPoll );
    yield takeLatest(ActionTypes.hostpoll.UPDATE_POLL_START, updateHostPoll );
    yield takeLatest(ActionTypes.hostpoll.UPDATE_POLL_STATUS_START, changePollStatusPoll );
    yield takeLatest(ActionTypes.userpoll.SUBMIT_VOTE_START, sendVote );
    yield takeLatest(ActionTypes.pollresults.FETCH_RESULTS_START, fetchPollResults );

}
