
const ActionTypes = {
  FETCH_POLL_START: 'FETCH_POLL_START',
  FETCH_POLL_SUCCESS: 'FETCH_POLL_SUCCESS',
  FETCH_POLL_FAIL: 'FETCH_POLL_ERROR',

  SUBMIT_POLL_START: 'SUBMIT_POLL_START',
  SUBMIT_POLL_SUCCESS: 'SUBMIT_POLL_SUCCESS',
  SUBMIT_POLL_FAIL: 'SUBMIT_POLL_FAIL',

  UPDATE_SELECTED_OPTIONS: 'UPDATE_SELECTED_OPTIONS',

  roomcode: {
    UPDATE_ROOMCODE: 'UPDATE_ROOMCODE'
  },

  meetingroom: {
    FETCH_POLLS_START: 'FETCH_POLLS_START',
    FETCH_POLLS_SUCCESS: 'FETCH_POLLS_SUCCESS',
    FETCH_POLLS_FAIL: 'FETCH_POLLS_ERROR',
  }
};

export default ActionTypes;