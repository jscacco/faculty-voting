// import PollItem from '../../components/PollItem';
import ActionTypes from '../actionTypes';

const initialState = {
  rooms: null,
  order: {
    'open': [],
    'closed': [],
    'pending': []
  }
}

let result;

export default function reduceHostDash(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.hostdash.FETCH_ROOMS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostdash.FETCH_ROOMS_SUCCESS:
      result = action.response;
      console.log(result);
      return {
        ...state,
        loading: false,
        rooms: result.rooms,
        order: result.order
      };
    case ActionTypes.hostdash.FETCH_ROOMS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    // case ActionTypes.SUBMIT_POLL_START:
    //   // console.log('started');
    //   return { ...state, loading: true, error: null };
    //
    // case ActionTypes.SUBMIT_POLL_SUCCESS:
    //   result = action.response;
    //   // console.log(result);
    //   return {
    //     ...state,
    //     loading: false,
    //     submission: result,
    //   };
    // case ActionTypes.SUBMIT_POLL_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: true
    //   };
    // case ActionTypes.UPDATE_SELECTED_OPTIONS:
    //   result = action.selection.map((item) => item);
    //   return {
    //     ...state,
    //     selected: result,
    //   };

  }
  // console.log(state);
  return state;
}

// export default function;
