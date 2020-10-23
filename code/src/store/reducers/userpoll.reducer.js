// import PollItem from '../../components/PollItem';
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
  // inputOptionValue: '',
  // selection: [],
  // submission: [],
  // submissionInputValue: null,
  // selected: false,
  // submitted: false,
  // submissionStatus: 'unselected',
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
    else { status= 'submit' }
  }
  else if (!state.pollStatus.selected && state.pollStatus.submitted) {
    status = 'submitted'
  }
  else {
    status = 'submitted'
    // let resubmit = false;
    for (let i=0; i < state.poll.optionsOrder.length; i++) {
      let id = state.poll.optionsOrder[i];
      if (state.pollStatus.selection[id] !== state.pollStatus.submission[id]) {
        status = 'resubmit'
        // resubmit = true;
        break;}
    }
    // console.log(resubmit);
    if (state.pollStatus.selection['000']) {

      if (!state.pollStatus.submission['000'] ) {
        if (state.userInput.value !== '') {
          // resubmit = true;
          status = 'resubmit'
        }
        else { status = 'unfilledInput'}
      }
      else {
        if (state.userInput.value !== state.userInput.submissionValue) {
          if (state.userInput.value !== '') {
            status = 'resubmit'
            // resubmit = true;
          }
          else { status = 'unfilledInput'}
        }
      }

      // if (!state.pollStatus.submission['000'] && state.userInput.value !== ''){
      //   console.log('1')
      //   resubmit = true;
      // }
      // else if (state.pollStatus.submission['000']){
      //   if (state.userInput.value !== '' && state.userInput.value !== state.userInput.submissionValue){
      //     console.log('2')
      //     resubmit = true;
      //   }
      //   else if (resubmit && state.userInput.value === state.userInput.submissionValue){
      //     resubmit = true;
      //   }
      //   else { resubmit = false }
      // }
      // else { resubmit = false }
    }
    else if (state.pollStatus.submission['000']) {
      status = 'resubmit'
      // resubmit = true;
    }

    // resubmit ? status = 'resubmit' : status = 'submitted';
  }

  return status;
}

let result;
let newState;

export default function reduceUserPoll(state = initialState, action) {

  switch (action.type) {
    case ActionTypes.userpoll.FETCH_POLL_START:
      console.log('here');
      return { ...state, loading: true, error: null };

    case ActionTypes.userpoll.FETCH_POLL_SUCCESS:
      result = action.response;
      console.log(result)
      return {
        ...state,
        poll: {...result},
        loading: false,
      };
    case ActionTypes.userpoll.FETCH_POLL_ERROR:
      return {
        ...state,
        loading: false,
        error: true
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
    case ActionTypes.userpoll.UPDATE_SUBMISSION:

      console.log(state);

      let inputSubmission = state.pollStatus.selection['000'] ? state.userInput.value : null;

      newState = {
        ...state,
        userInput: {
          ...state.userInput,
          submissionValue: inputSubmission
        },
        pollStatus: {
          ...state.pollStatus,
          submission: {...state.pollStatus.selection},
          submitted: true,
        },
      }

      console.log(newState)

      return {
        ...newState,
        pollStatus: {
          ...newState.pollStatus,
          submitStatus: submissionStatus(newState)
        }
      }

      // newState = {
      //   ...state,
      //   submission: {...state.selection},
      //   submitted: true,
      //   inputSubmission: inputSubmission
      // }
      //
      // return {
      //   ...newState,
      //   submissionStatus: submissionStatus(newState)

    case ActionTypes.userpoll.UPDATE_INPUT:

      console.log(action);

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
  return state;
}
