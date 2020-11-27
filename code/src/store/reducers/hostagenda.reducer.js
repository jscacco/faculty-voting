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
  fileUploaded: null,
  editing: false,
  loading: false,
  error: null,
}

let result;
let newPolls;
let newOrder;

export default function reduceHostAgenda(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.hostagenda.FETCH_AGENDA_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.FETCH_AGENDA_SUCCESS:
      result = action.response;
      return {
        ...state,
        title: result.title,
        status: result.status,
        polls: result.polls,
        order: result.order,
        loading: false,
      };
    case ActionTypes.hostagenda.FETCH_AGENDA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case ActionTypes.hostagenda.UPDATE_TITLE:
      return {
        ...state,
        title: action.event.target.value,
      };

    case ActionTypes.hostagenda.ADD_POLL_START:
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
        },
        loading: false
      };
    case ActionTypes.hostagenda.ADD_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: result.error
      };


    case ActionTypes.hostagenda.DELETE_POLL:
      newPolls = {...state.polls};
      delete newPolls[action.poll_id];

      newOrder = {...state.order}
      newOrder['pending'] = state.order['pending'].filter(i => i !== action.poll_id)

      return {
        ...state,
        polls: newPolls,
        order: newOrder
      };


    case ActionTypes.hostagenda.UPDATE_AGENDA_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.UPDATE_AGENDA_SUCCESS:
      result = action.response;
      return {
        ...state,
        title: result.title,
        status: result.status,
        polls: result.polls,
        order: result.order,
        loading: false,
      };
    case ActionTypes.hostagenda.UPDATE_AGENDA_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case ActionTypes.hostagenda.TOGGLE_EDIT:
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

    case ActionTypes.hostagenda.UPDATE_POLL_STATUS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.UPDATE_POLL_STATUS_SUCCESS:
      result = action.response;

      return {
        ...state,
        polls: {...result.polls},
        order: { ...result.order},
        loading: false
      };
    case ActionTypes.hostagenda.UPDATE_POLL_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: result.error
      };

    case ActionTypes.hostagenda.UPDATE_ROOM_STATUS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.UPDATE_ROOM_STATUS_SUCCESS:
      result = action.response;

      return {
        ...state,
        status: result.status,
        polls: {...result.polls},
        order: { ...result.order},
        loading: false,
      };
    case ActionTypes.hostagenda.UPDATE_ROOM_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: result.error
      };

    case ActionTypes.hostagenda.UPDATE_VOTERS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostagenda.UPDATE_VOTERS_SUCCESS:

      return {
        ...state,
        fileUploaded: action.filename,
        loading: false,
      };
    case ActionTypes.hostagenda.UPDATE_VOTERS_ERROR:
      return {
        ...state,
        loading: false,
        error: result.error
      };

    default:
      return state;
  }
}
