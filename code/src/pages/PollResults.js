import React, { useEffect }                from 'react';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import MainPage             from './format-pages/MainPage';

import PollResultsCard         from '../components/cards/PollResultsCard';
import ViewportHandler      from './format-pages/ViewportHandler';

const getSize = (viewport) => {

  let size = {};
  switch (viewport) {
    case 'tablet':
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

const ResultsComponent = (props) => {
  const size = getSize(props.viewport)

  return <PollResultsCard pollResults={props.pollResults} {...size}/>
}

const PollResultsPage = ( props ) => {

  const roomcode = props.match.params.roomcode;
  const pollcode = props.match.params.pollcode;
  const { onFetchResults } = props;

  useEffect(() =>  {
    onFetchResults(roomcode, pollcode);
  }, [roomcode, pollcode, onFetchResults])

  return (
    <ViewportHandler>
      <MainPage roomcode={roomcode}>
        <ResultsComponent pollResults={props.pollResults}/>
      </MainPage>
    </ViewportHandler>
  );
}

const mapStateToProps = (state) => {

  return {
    pollResults: state.pollresults.pollResults,
    loading: state.pollresults.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchResults: (room_id, poll_id ) => dispatch({ type: ActionTypes.pollresults.FETCH_RESULTS_START,
                                                   room_id, poll_id }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollResultsPage);
