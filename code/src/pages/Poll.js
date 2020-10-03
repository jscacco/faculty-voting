import React, { useEffect, useState }	    from 'react';
import styled   from 'styled-components';

import { connect } from 'react-redux';
import ActionTypes from '../store/actionTypes';

import { Colors } from '../components/theme/Colors';

import VotingCard from '../components/cards/VotingCard';


const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

const PollScreen = ( props ) => {

  useEffect(() =>  {
    props.onFetchPoll(props.pollId);
 }, [])


  const _renderPollScreen = () => (
    <VotingCard type={props.poll.type}
                title={props.poll.title}
                description={props.poll.description}
                options={props.poll.options}
                medium/>
  );


  return (
      <PageWrapper>
        {(props.poll && !props.loading) ? _renderPollScreen() : <div/>}
      </PageWrapper>
    )

}

const mapStateToProps = (state) => {

  return {
    poll: state.poll.pollData,
    loading: state.poll.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPoll: (poll_id) => dispatch({ type: ActionTypes.FETCH_POLL_START,
                                         poll_id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollScreen);
