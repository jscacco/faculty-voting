import PollItem from '../../components/PollItem';
import ActionTypes from '../actionTypes';

const initialState = {
  pollsData: null,
  options: ['', ''],
  pollTitle: '',
  pollDescription: '',
  showResults: true,
  poll: new PollItem(),

  loading: false,
  error: false,
};

let result;

export default function reducePolls(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.meetingroom.FETCH_POLLS_START:
      console.log('started');
      return { ...state, loading: true, error: null };

    case ActionTypes.meetingroom.FETCH_POLLS_SUCCESS:
      console.log('success');
      result = action.response;
      // console.log(result);
      return {
        ...state,
        loading: false,
        pollsData: result,
      };
    case ActionTypes.meetingroom.FETCH_POLLS_ERROR:
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
  console.log(state);
  return state;
}

// export default function;
