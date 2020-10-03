import ActionTypes from '../actionTypes';

const initialState = {
  pollData: null,
  submission: null,
  selected: null,

  loading: false,
  error: false,
};

let result;

export default function reducePoll(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.FETCH_POLL_START:
      console.log('started');
      return { ...state, loading: true, error: null };

    case ActionTypes.FETCH_POLL_SUCCESS:
      result = action.response;
      // console.log(result);
      return {
        ...state,
        loading: false,
        pollData: result,
        submission: new Array(result.options.length).fill(false),
        selected: new Array(result.options.length).fill(false),
      };
    case ActionTypes.FETCH_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case ActionTypes.SUBMIT_POLL_START:
      // console.log('started');
      return { ...state, loading: true, error: null };

    case ActionTypes.SUBMIT_POLL_SUCCESS:
      result = action.response;
      // console.log(result);
      return {
        ...state,
        loading: false,
        submission: result,
      };
    case ActionTypes.SUBMIT_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case ActionTypes.UPDATE_SELECTED_OPTIONS:
      result = action.selection.map((item) => item);
      return {
        ...state,
        selected: result,
      };

  }
  console.log(state);
  return state;
}

// export default function;
