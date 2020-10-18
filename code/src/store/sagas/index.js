import { takeLatest, all }             from "redux-saga/effects";
import ActionTypes                from '../actionTypes';

import { fetchRooms,
         deleteRoom,
         addRoom }             from './hostdash.saga.js';
import { fetchUserAgenda }     from './useragenda.saga.js';
import { fetchHostAgenda, updateHostAgenda         }     from './hostagenda.saga.js';


// watcher saga: watches for actions dispatched to the store, starts worker saga

export function* watcherSaga() {
    yield takeLatest(ActionTypes.hostdash.FETCH_ROOMS_START, fetchRooms);
    yield takeLatest(ActionTypes.hostdash.DELETE_ROOM_START, deleteRoom);
    yield takeLatest(ActionTypes.hostdash.ADD_ROOM_START, addRoom);
    yield takeLatest(ActionTypes.useragenda.FETCH_AGENDA_START, fetchUserAgenda);
    yield takeLatest(ActionTypes.hostagenda.FETCH_AGENDA_START, fetchHostAgenda);
    yield takeLatest(ActionTypes.hostagenda.UPDATE_AGENDA_START, updateHostAgenda );


}
