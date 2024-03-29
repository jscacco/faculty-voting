import React, { useEffect }                from 'react';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import LoadingCard              from '../components/cards/LoadingCard';

import { Colors }           from '../components/theme/Colors';
import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';

import UserPollCard         from '../components/cards/UserPollCard';


const getSize = (viewport) => {

  let size = {};
  switch (viewport) {
    case 'mobile':
    case 'smallMobile':
    case 'tablet':
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

  if (props.loading) {
    return (
      <LoadingCard cardColor={Colors.White}
                   cardBorderColor={Colors.White}
                   textColor={Colors.Blue}
                   {...size}/>
    );
  }

  return (
    <UserPollCard pollData={props.pollData}
                  userInput={props.userInput}
                  onOptionChange={props.onOptionChange}
                  onInputChange={props.onInputChange}
                  onSubmit={props.onSubmit}
                  selectedOptions={props.selectedOptions}
                  submittedOptions={props.submittedOptions}
                  submissionStatus={props.submissionStatus}
                  submitLoading={props.submitLoading}
                  {...size} />
  )
}

const UserPollPage = ( props ) => {

  const roomcode = props.match.params.roomcode;
  const pollcode = props.match.params.pollcode;
  const { user, onFetchPoll, history } = props;

  useEffect(() =>  {
    if ( user === null) {
      alert('Please login with Hamilton affiliated email to access.')
      history.replace('/Login', [])
    }
    else if ( user !== undefined ){ onFetchPoll(roomcode, pollcode); }
  }, [user, roomcode, pollcode, onFetchPoll, history])

  console.log(props);

  if ( props.error ) { console.log(props.error); history.replace('/Login') }

  return (
    <ViewportHandler>
      <MainPage roomcode={roomcode}>
        <PollComponent loading={props.loading}
                       pollData={props.poll}
                       userInput={props.userInput}
                       onOptionChange={props.onOptionChange}
                       onInputChange={props.onInputChange}
                       onSubmit={() => props.onSubmit(roomcode, pollcode)}
                       selectedOptions={props.selection}
                       submittedOptions={props.submission}
                       submissionStatus={props.submissionStatus}
                       submitLoading={props.submitLoading}/>
      </MainPage>
    </ViewportHandler>
  );
}

const mapStateToProps = (state) => {

  return {
    user: state.auth.user,
    poll: state.userpoll.poll,
    userInput: state.userpoll.userInput,
    selection: state.userpoll.pollStatus.selection,
    submission: state.userpoll.pollStatus.submission,
    submissionStatus: state.userpoll.pollStatus.submitStatus,
    submitloading: state.userpoll.submitLoading,
    loading: state.auth.user === undefined || state.hostagenda.loading,
    error: state.userpoll.error,
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
