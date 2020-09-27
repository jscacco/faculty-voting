import * as actionTypes from '../actions/actionTypes';

const initState = {
  poll: {},
  loading: false,
  error: false,
};

export default function reducePoll(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.poll.fetchPoll.START:
      return { ...state, loading: true, error: null };

    case ActionTypes.poll.fetchPoll.SUCCESS:
      const result = action.response;
      return {
        ...state,
        loading: false,
        poll: result
      };
  }

  return state;
}

// const fetchPollStart = ( state, action ) => {
//     return {...state, loading: true};
// };
//
// const fetchPollSuccess = ( state, action ) => {
//     return  { ...state,
//               poll: action.poll,
//               loading: false,
//             }
// };
//
// const fetchPollFail = ( state, action ) => {
//     return { ...state,
//              loading: false,
//              error: true,
//            }
// };
//
// const reducer = ( state = initState, action ) => {
//   switch ( action.type ) {
//         case actionTypes.FETCH_POLL_START: return fetchPollStart( state, action );
//         case actionTypes.FETCH_POLL_SUCCESS: return fetchPollSuccess( state, action );
//         case actionTypes.FETCH_POLL_FAIL: return fetchPollFail( state, action );
//         default: return state;
//     }
// };

// export default reducer;
