import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import UserPollCard         from '../components/cards/UserPollCard';

import { fetchPollData } from '../store/MockDataFunctions'
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  position: fixed;
  overflow: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;


const UserPollPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';
  const pollcode = props.match.params.pollcode || '00';

  useEffect(() =>  {
    props.onFetchPoll(roomcode, pollcode);
  }, [])

  console.log(props);

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <UserPollCard pollData={props.poll}
                      userInput={props.userInput}
                      onOptionChange={props.onOptionChange}
                      onInputChange={props.onInputChange}
                      onSubmit={props.onSubmit}
                      submittedOptions={props.submission}
                      submissionStatus={props.submissionStatus}
                      medium />
      </ComponentWrapper>
    </PageWrapper>
  );
}

const mapStateToProps = (state) => {

  return {
    poll: state.userpoll.poll,
    userInput: state.userpoll.userInput,
    selection: state.userpoll.pollStatus.selection,
    submission: state.userpoll.pollStatus.submission,
    submissionStatus: state.userpoll.pollStatus.submitStatus,
    loading: state.userpoll.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPoll: (room_id, poll_id ) => dispatch({ type: ActionTypes.userpoll.FETCH_POLL_START,
                                                   room_id, poll_id }),
    onOptionChange: (selection) => dispatch({ type: ActionTypes.userpoll.UPDATE_SELECTION,
                                              selection}),
    onSubmit: () => dispatch({ type: ActionTypes.userpoll.UPDATE_SUBMISSION, }),
    onInputChange: (event) => dispatch({ type: ActionTypes.userpoll.UPDATE_INPUT,
                                         event}),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPollPage);
