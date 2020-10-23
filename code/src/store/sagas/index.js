import { takeLatest, all }             from "redux-saga/effects";
import ActionTypes                from '../actionTypes';

import { validateRoomcode }   from './roomcode.saga'
import { fetchRooms,
         deleteRoom,
         addRoom }             from './hostdash.saga.js';
import { fetchUserAgenda }     from './useragenda.saga.js';
import { fetchHostAgenda, updateHostAgenda,
         addRoomPoll,
         changePollStatus }     from './hostagenda.saga.js';
import { fetchUserPoll }  from './userpoll.saga';
import { fetchHostPoll }  from './hostpoll.saga';


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
    yield takeLatest(ActionTypes.userpoll.FETCH_POLL_START, fetchUserPoll );
    yield takeLatest(ActionTypes.hostpoll.FETCH_POLL_START, fetchHostPoll );


}
