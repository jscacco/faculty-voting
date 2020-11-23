import ActionTypes from '../actionTypes';

const initialState = {
  roomResults: {
    title: null,
    allResults: null,
    order: [],
  },

  loading: false,
  error: false,
};

let result;

export default function reduceRoomResult(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.roomresults.FETCH_RESULTS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.roomresults.FETCH_RESULTS_SUCCESS:
      result = action.response;
      return {
        ...state,
        loading: false,
        roomResults: {...result},
      };
    case ActionTypes.roomresults.FETCH_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  };
}
