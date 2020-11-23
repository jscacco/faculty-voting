import ActionTypes from '../actionTypes';

const initialState = {
  poll: {  title: null,
    status: null,
    type: null,
    description: null,
    options: null,
    optionsOrder: [],
    userInputOption: false,
  },
  userInput: {
    id: '000',
    value: '',
    submissionId: null,
    submissionValue: null,
  },
  pollStatus: {
    selection: {},
    submission: {},
    submitStatus: 'unselected'
  },
  submitLoading: false,
  loading: false,
  error: null,
}

const submissionStatus = (state) => {

  let status;

  if (!state.pollStatus.selected && !state.pollStatus.submitted) {
    status = 'unselected'
  }
  else if (state.pollStatus.selected && !state.pollStatus.submitted) {
    if (state.pollStatus.selection['000'] && state.userInput.value === ''){
      status = 'unfilledInput'
    }
    else { status = 'submit' }
  }
  else if (!state.pollStatus.selected && state.pollStatus.submitted) {
    status = 'submitted'
  }
  else {
    status = 'submitted'
    for (let i=0; i < state.poll.optionsOrder.length; i++) {
      let id = state.poll.optionsOrder[i];
      if (state.pollStatus.selection[id] !== state.pollStatus.submission[id]) {
        status = 'resubmit'
        break;}
    }

    if (state.pollStatus.selection['000']) {

      if (!state.pollStatus.submission['000'] ) {
        if (state.userInput.value !== '') {
          status = 'resubmit'
        }
        else { status = 'unfilledInput'}
      }
      else {
        if (state.userInput.value !== state.userInput.submissionValue) {
          if (state.userInput.value !== '') {
            status = 'resubmit'
          }
          else { status = 'unfilledInput'}
        }
      }
    }
    else if (state.pollStatus.submission['000']) {
      status = 'resubmit'
    }
  }

  return status;
}

let result;
let newState;

export default function reduceUserPoll(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.userpoll.FETCH_POLL_START:
      return { ...state, loading: true, error: null };

    case ActionTypes.userpoll.FETCH_POLL_SUCCESS:
      result = action.response;
      return {
        ...state,
        poll: {...result},
        loading: false,
      };
    case ActionTypes.userpoll.FETCH_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case ActionTypes.userpoll.UPDATE_SELECTION:

      let selected = false;
      for (let i=0; i < state.poll.optionsOrder.length; i++) {
        let id = state.poll.optionsOrder[i];
        if (action.selection[id]) { selected = true; break;}
      }
      if (state.poll.userInputOption && action.selection['000']) {
        selected = true;
      }

      newState = {
        ...state,
        pollStatus: {
          ...state.pollStatus,
          selection: action.selection,
          selected: selected,
        },
      }

      return {
        ...newState,
        pollStatus: {
          ...newState.pollStatus,
          submitStatus: submissionStatus(newState)
        }
      };

    case ActionTypes.userpoll.SUBMIT_VOTE_START:
      return { ...state, submitLoading: true, loading: true, error: null };
    case ActionTypes.userpoll.SUBMIT_VOTE_SUCCESS:

      result = action.response;

      let inputSubmission = state.pollStatus.selection['000'] ? state.userInput.value : null;

      newState = {
        ...state,
        userInput: {
          ...state.userInput,
          submissionId: result.inputSubmissionId,
          submissionValue: inputSubmission
        },
        pollStatus: {
          ...state.pollStatus,
          submission: {...state.pollStatus.selection},
          submitted: true,
        },
        submitLoading: false,
        loading: false,
      }

      return {
        ...newState,
        pollStatus: {
          ...newState.pollStatus,
          submitStatus: submissionStatus(newState)
        }
      }

      case ActionTypes.userpoll.SUBMIT_VOTE_ERROR:
        return {
          ...state,
          submitLoading: false,
          loading: false,
          error: action.error
        };

    case ActionTypes.userpoll.UPDATE_INPUT:

      newState = {
        ...state,
        userInput: {
          ...state.userInput,
          value: action.event.target.value,
        }
      }
      return {
        ...newState,
        pollStatus: {
          ...newState.pollStatus,
          submitStatus: submissionStatus(newState)
        }
      }
    default:
      return state;

  }
}
