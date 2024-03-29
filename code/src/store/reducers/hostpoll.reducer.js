import ActionTypes from '../actionTypes';
import { generateOptionId } from '../MockDataFunctions';

const initialState = {
  poll: {
    title: null,
    status: null,
    type: null,
    description: null,
    options: null,
    optionsOrder: [],
    userInputOption: false,
    showResults: true,
  },
  editing: false,
  loading: false,
  error: null,
}


let result;
let newOptions;
let newOptionsOrder;

export default function reduceUserPoll(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.hostpoll.FETCH_POLL_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostpoll.FETCH_POLL_SUCCESS:
      result = action.response;
      return {
        ...state,
        poll: {...result},
        editing: action.location_state ? action.location_state.editing : false,
        loading: false,
      };
    case ActionTypes.hostpoll.FETCH_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case ActionTypes.hostpoll.TOGGLE_EDIT:
      return {
        ...state,
        editing: !state.editing,
      };
    case ActionTypes.hostpoll.DELETE_POLL:
      newOptions = {...state.poll.options};
      delete newOptions[action.option_id];
      newOptionsOrder = state.poll.optionsOrder.filter((i) => i !== action.option_id)

      return {
        ...state,
        poll: {...state.poll,
               options: newOptions,
               optionsOrder: newOptionsOrder
              }
      };
    case ActionTypes.hostpoll.ADD_POLL:
      let option_id = generateOptionId();
      while (state.poll.options[option_id] !== undefined ) {
        option_id = generateOptionId();
      }

      newOptions = {...state.poll.options};
      newOptions[option_id] = {
        id: option_id,
        value: 'Option ' + option_id,
        optionType: 'text'
      };
      newOptionsOrder = state.poll.optionsOrder.map(i => i);
      newOptionsOrder.push(option_id);

      return {
        ...state,
        poll: {...state.poll,
               options: newOptions,
               optionsOrder: newOptionsOrder
              }
      };

    case ActionTypes.hostpoll.UPDATE_ORDER:
      return {
        ...state,
        poll: {
          ...state.poll,
          optionsOrder: action.order,
        }
      }
    case ActionTypes.hostpoll.UPDATE_OPTION:
      newOptions = {...state.poll.options};
      newOptions[action.option_id] = {
        ...newOptions[action.option_id],
        value: action.event.target.value,
      };

      return {
        ...state,
        poll: {...state.poll,
               options: newOptions,
              }
      };
    case ActionTypes.hostpoll.UPDATE_TITLE:

      return {
        ...state,
        poll: {...state.poll,
               title: action.event.target.value,
              }
      };

    case ActionTypes.hostpoll.UPDATE_DESCRIPTION:

      return {
        ...state,
        poll: {...state.poll,
               description: action.event.target.value,
              }
      }
    case ActionTypes.hostpoll.UPDATE_SETTINGS:
      return {
        ...state,
        poll: {...state.poll,
               ...action.settings,
              }
    }

    case ActionTypes.hostpoll.UPDATE_POLL_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostpoll.UPDATE_POLL_SUCCESS:
      result = action.response;
      return {
        ...state,
        poll: {...result},
        loading: false,
      };
    case ActionTypes.hostpoll.UPDATE_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case ActionTypes.hostpoll.UPDATE_POLL_STATUS_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.hostpoll.UPDATE_POLL_STATUS_SUCCESS:
      result = action.poll;
      return {
        ...state,
        poll: {...result},
        loading: false,
      };
    case ActionTypes.hostpoll.UPDATE_POLL_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;

  }
}
