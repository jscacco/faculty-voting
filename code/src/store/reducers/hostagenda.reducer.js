// import { generatePollId } from '../MockDataFunctions';
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
  editing: false,
  loading: false,
  error: null,
}

let result;
let newPolls;
let newOrder;

export default function reduceHostAgenda(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.hostagenda.FETCH_AGENGA_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.FETCH_AGENDA_SUCCESS:
      result = action.response;
      return {
        ...state,
        loading: false,
        title: result.title,
        status: result.status,
        polls: result.polls,
        order: result.order
      };
    case ActionTypes.hostagenda.FETCH_AGENDA_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    case ActionTypes.hostagenda.UPDATE_TITLE:
      return {
        ...state,
        title: action.event.target.value,
      };

    case ActionTypes.hostagenda.ADD_POLL_START:
      console.log('here')
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.ADD_POLL_SUCCESS:
      result = action.response;

      newPolls = {...state.polls};
      newPolls[result.newPoll.id] = result.newPoll;

      newOrder = {...state.order};
      const newPending = newOrder['pending'].map(i => i)
      newPending.push(result.newPoll.id);

      return {
        ...state,
        polls: newPolls,
        order: { ...newOrder,
                 'pending': newPending
        }
      };
    case ActionTypes.hostagenda.ADD_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };


    case ActionTypes.hostagenda.DELETE_POLL:
      newPolls = {...state.polls};
      delete newPolls[action.poll_id];

      newOrder = {...state.order}
      newOrder['pending'] = state.order['pending'].filter(i => i != action.poll_id)

      return {
        ...state,
        polls: newPolls,
        order: newOrder
      };


    case ActionTypes.hostagenda.UPDATE_AGENGA_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.UPDATE_AGENDA_SUCCESS:
      result = action.response;
      return {
        ...state,
        loading: false,
        title: result.title,
        status: result.status,
        polls: result.polls,
        order: result.order
      };
    case ActionTypes.hostagenda.UPDATE_AGENDA_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case ActionTypes.hostagenda.TOGGLE_EDIT:
      // console.log('here')
      const editing = !state.editing;
      return {
        ...state,
        editing: editing
      }


    case ActionTypes.hostagenda.UPDATE_ORDER:

      newOrder = {...state.order};
      newOrder['pending'] = action.newPendingOrder;

      return {
        ...state,
        order: newOrder
      }
    default:
      return state;

    case ActionTypes.hostagenda.UPDATE_POLL_STATUS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.UPDATE_POLL_STATUS_SUCCESS:
      result = action.response;

      return {
        ...state,
        polls: {...result.polls},
        order: { ...result.order}
      };
    case ActionTypes.hostagenda.UPDATE_POLL_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

  }
  return state;
}
