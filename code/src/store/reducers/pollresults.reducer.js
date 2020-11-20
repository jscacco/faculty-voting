import ActionTypes from '../actionTypes';

const initialState = {
  pollResults: {
    optionsOrder: [],
  },

  loading: false,
  error: false,
};

let result;

export default function reducePollResult(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.pollresults.FETCH_RESULTS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.pollresults.FETCH_RESULTS_SUCCESS:
      result = action.response;
      return {
        ...state,
        loading: false,
        pollResults: result,
      };
    case ActionTypes.pollresults.FETCH_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
    };
  return state;
}

// export default function;
