// import PollItem from '../../components/PollItem';
import ActionTypes from '../actionTypes';

const initialState = {
  title: null,
  status: null,
  polls: null,
  order: {
    'open': [],
    'closed': [],
    'pending': []
  },
  loading: false,
  error: null,
}

let result;

export default function reduceUserAgenda(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.useragenda.FETCH_AGENGA_START:
      console.log('here');
      return { ...state, loading: true, error: null };

    case ActionTypes.useragenda.FETCH_AGENDA_SUCCESS:
      result = action.response;
      console.log(result)
      return {
        ...state,
        loading: false,
        title: result.title,
        status: result.status,
        polls: result.polls,
        order: result.order
      };
    case ActionTypes.useragenda.FETCH_AGENDA_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;

  }
  return state;
}
