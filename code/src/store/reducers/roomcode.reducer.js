import ActionTypes from '../actionTypes';

const initialState = {
  roomcode: '',
  submitted: false,
  loading: false,
  error: false,
};

let result;

export default function reducePoll(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.roomcode.UPDATE_ROOMCODE:
      result = action.value;
      return {
        ...state,
        roomcode: result,
        submitted: false,
        error: false,
      };
    case ActionTypes.roomcode.CHECK_ROOMCODE_START:
      return {
        ...state,
        submitted: true,
        loading: true,
        error: false,
      };
    case ActionTypes.roomcode.CHECK_ROOMCODE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.roomcode.CHECK_ROOMCODE_ERROR:
      return {
        ...state,
        roomcode: '',
        loading: false,
        error: true,
      };
    case ActionTypes.roomcode.RESET_ROOMCODE:
      return {
        ...state,
        roomcode: '',
        submitted: false,
        loading: false,
        error: false,
      }

    default:
      return state;

  }
}
