// import PollItem from '../../components/PollItem';
import ActionTypes from '../actionTypes';

const initialState = {
  rooms: null,
  order: {
    'open': [],
    'closed': [],
    'pending': []
  },
  loading: false,
  error: null,
}

let result;

export default function reduceHostDash(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.hostdash.FETCH_ROOMS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostdash.FETCH_ROOMS_SUCCESS:
      result = action.response;

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
        error: action.error
      };


    case ActionTypes.hostdash.DELETE_ROOM_START:
    return { ...state, loading: true, error: null };

    case ActionTypes.hostdash.DELETE_ROOM_SUCCESS:
      result = action.response;
      // console.log(result);
      return {
        ...state,
        loading: false,
        rooms: result.rooms,
        order: result.order
      };
    case ActionTypes.hostdash.DELETE_ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case ActionTypes.hostdash.ADD_ROOM_START:
      console.log('jer')
      return { ...state, loading: true, error: null };

    case ActionTypes.hostdash.ADD_ROOM_SUCCESS:
      result = action.response;
      console.log(result);
      return {
        ...state,
        loading: false,
        rooms: result.rooms,
        order: result.order
      };
    case ActionTypes.hostdash.ADD_ROOM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
  // console.log(state);
  return state;
}

// export default function;
