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
      return { ...state, loading: true, error: null };

    case ActionTypes.meetingroom.FETCH_POLLS_SUCCESS:
      result = action.response;
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
  }
  
  return state;
}

// export default function;
