import { takeLatest }             from "redux-saga/effects";
import ActionTypes                from '../actionTypes';

import { fetchPoll,
         submitPoll } 							    from './poll.saga';
import { fetchPolls }             from './meetingroom.saga';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {

  yield takeLatest(ActionTypes.FETCH_POLL_START, fetchPoll);
  yield takeLatest(ActionTypes.SUBMIT_POLL_START, submitPoll);
  yield takeLatest(ActionTypes.meetingroom.FETCH_POLLS_START, fetchPolls);

}
