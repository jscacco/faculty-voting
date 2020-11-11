import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';

import UserPollCard         from '../components/cards/UserPollCard';


const getSize = (viewport) => {

  let size = {};
  switch (viewport) {
    case 'mobile':
    case 'smallMobile':
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      size.medium = true;
      break;
    default:
      size.small = true;
  }

  return size;
}

const PollComponent = ( props ) => {

  const size = getSize(props.viewport);

  return (
    <UserPollCard pollData={props.pollData}
                  userInput={props.userInput}
                  onOptionChange={props.onOptionChange}
                  onInputChange={props.onInputChange}
                  onSubmit={props.onSubmit}
                  submittedOptions={props.submittedOptions}
                  submissionStatus={props.submissionStatus}
                  submitLoading={props.submitLoading}
                  {...size} />
  )
}

const UserPollPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';
  const pollcode = props.match.params.pollcode || '00';

  useEffect(() =>  {
    props.onFetchPoll(roomcode, pollcode);
  }, [])

  return (
    <MainPage>
      <ViewportHandler>
        <PollComponent pollData={props.poll}
                       userInput={props.userInput}
                       onOptionChange={props.onOptionChange}
                       onInputChange={props.onInputChange}
                       onSubmit={() => props.onSubmit(roomcode, pollcode)}
                       submittedOptions={props.submission}
                       submissionStatus={props.submissionStatus}
                       submitLoading={props.submitLoading}/>
      </ViewportHandler>
    </MainPage>
  );
}

const mapStateToProps = (state) => {

  return {
    poll: state.userpoll.poll,
    userInput: state.userpoll.userInput,
    selection: state.userpoll.pollStatus.selection,
    submission: state.userpoll.pollStatus.submission,
    submissionStatus: state.userpoll.pollStatus.submitStatus,
    submitloading: state.userpoll.submitLoading,
    loading: state.userpoll.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPoll: (room_id, poll_id ) => dispatch({ type: ActionTypes.userpoll.FETCH_POLL_START,
                                                   room_id, poll_id }),
    onOptionChange: (selection) => dispatch({ type: ActionTypes.userpoll.UPDATE_SELECTION,
                                              selection}),
    onSubmit: (room_id, poll_id) => dispatch({ type: ActionTypes.userpoll.SUBMIT_VOTE_START,
                                                room_id, poll_id }),
    onInputChange: (event) => dispatch({ type: ActionTypes.userpoll.UPDATE_INPUT,
                                         event}),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPollPage);
