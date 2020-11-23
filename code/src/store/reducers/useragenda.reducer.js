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
    case ActionTypes.useragenda.FETCH_AGENDA_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.useragenda.FETCH_AGENDA_SUCCESS:
      result = action.response;
      return {
        ...state,
        title: result.title,
        status: result.status,
        polls: result.polls,
        order: result.order,
        loading: false,
      };
    case ActionTypes.useragenda.FETCH_AGENDA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;

  }
}
