
const ActionTypes = {
    roomcode: {
      UPDATE_ROOMCODE: 'UPDATE_ROOMCODE',
      CHECK_ROOMCODE_START: 'CHECK_ROOMCODE_START',
      CHECK_ROOMCODE_SUCCESS: 'CHECK_ROOMCODE_SUCCESS',
      CHECK_ROOMCODE_ERROR: 'CHECK_ROOMCODE_ERROR',
      RESET_ROOMCODE: 'RESET_ROOMCODE'
    },
    hostdash: {
      FETCH_ROOMS_START: 'FETCH_ROOMS_START',
      FETCH_ROOMS_SUCCESS: 'FETCH_ROOMS_SUCCESS',
      FETCH_ROOMS_ERROR: 'FETCH_ROOMS_ERROR',
      DELETE_ROOM_START: 'DELETE_ROOM_START',
      DELETE_ROOM_SUCCESS: 'DELETE_ROOM_SUCCESS',
      DELETE_ROOM_ERROR: 'DELETE_ROOM_ERROR',
      ADD_ROOM_START: 'ADD_ROOM_START',
      ADD_ROOM_SUCCESS: 'ADD_ROOM_SUCCESS',
      ADD_ROOM_ERROR: 'ADD_ROOM_ERROR'
    },
    useragenda: {
      FETCH_AGENDA_START: 'FETCH_USER_AGENDA_START',
      FETCH_AGENDA_SUCCESS: 'FETCH_USER_AGENDA_SUCCESS',
      FETCH_AGENDA_ERROR: 'FETCH_USER_AGENDA_ERROR',
    },
    hostagenda: {
      FETCH_AGENDA_START: 'FETCH_HOST_AGENDA_START',
      FETCH_AGENDA_SUCCESS: 'FETCH_HOST_AGENDA_SUCCESS',
      FETCH_AGENDA_ERROR: 'FETCH_HOST_AGENDA_ERROR',
      UPDATE_AGENDA_START: 'UPDATE_AGENDA_START',
      UPDATE_AGENDA_SUCCESS: 'UPDATE_AGENDA_SUCCESS',
      UPDATE_AGENDA_ERROR: 'UPDATE_AGENDA_ERROR',
      TOGGLE_EDIT: 'TOGGLE_EDIT_ROOM',
      ADD_POLL_START: 'ADD_POLL_START',
      ADD_POLL_SUCCESS: 'ADD_POLL_SUCCESS',
      ADD_POLL_ERROR: 'ADD_POLL_ERROR',
      DELETE_POLL: 'DELETE_POLL_ROOM',
      UPDATE_ORDER: 'UPDATE_ORDER_ROOM',
      UPDATE_POLL_STATUS_START: 'UPDATE_POLL_STATUS_START',
      UPDATE_POLL_STATUS_SUCCESS: 'UPDATE_POLL_STATUS_SUCCESS',
      UPDATE_POLL_STATUS_ERROR: 'UPDATE_POLL_STATUS_ERROR',
    },
    userpoll: {
      FETCH_POLL_START: 'FETCH_USER_POLL_START',
      FETCH_POLL_SUCCESS: 'FETCH_USER_POLL_SUCCESS',
      FETCH_POLL_ERROR: 'FETCH_USER_POLL_ERROR',
      UPDATE_SELECTION: 'UPDATE_SELECTION_OPTIONS',
      UPDATE_SUBMISSION: 'UPDATE_SUBMISSION_OPTIONS',
      UPDATE_SUBMISSION_STATUS: 'UPDATE_SUBMISSION_STATUS',
      UPDATE_INPUT: 'USER_UPDATE_INPUT',
    },
    hostpoll: {
      FETCH_POLL_START: 'FETCH_HOST_POLL_START',
      FETCH_POLL_SUCCESS: 'FETCH_HOST_POLL_SUCCESS',
      FETCH_POLL_ERROR: 'FETCH_HOST_POLL_ERROR',
      TOGGLE_EDIT: 'HOST_TOGGLE_EDIT',
      ADD_POLL: 'HOST_ADD_POLL',
      DELETE_POLL: 'HOST_DELETE_POLL',
      UPDATE_ORDER: 'HOST_UPDATE_ORDER',
      UPDATE_OPTION: 'HOST_UPDATE_OPTION',
      UPDATE_TITLE: 'HOST_UPDATE_TITLE',
      UPDATE_DESCRIPTION: 'HOST_UPDATE_DESCRIPTION',
      UPDATE_SETTINGS: 'HOST_UPDATE_SETTINGS',
    },
    pollresults: {
      FETCH_RESULTS_START: 'FETCH_RESULTS_START',
      FETCH_RESULTS_SUCCESS: 'FETCH_RESULTS_SUCCESS',
      FETCH_RESULTS_ERROR: 'FETCH_RESULTS_ERROR',
    }
};

export default ActionTypes;
