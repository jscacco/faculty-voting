import React, { useEffect }                from 'react';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import MainPage             from './format-pages/MainPage';

import RoomResultsCard         from '../components/cards/RoomResultsCard';
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
  const size = getSize(props.viewport);

  return <RoomResultsCard {...size} roomResults={props.roomResults}/>
}

const PollResultsPage = ( props ) => {

  const { roomResults, onFetchResults } = props;
  const roomcode = props.match.params.roomcode;

  useEffect(() =>  {
    onFetchResults(roomcode);
  }, [roomcode, onFetchResults])

  return (
    <ViewportHandler>
      <MainPage roomcode={roomcode}>
        <ResultsComponent roomResults={roomResults}/>
      </MainPage>
    </ViewportHandler>
  );
}

const mapStateToProps = (state) => {

  return {
    roomResults: state.roomresults.roomResults,
    loading: state.roomresults.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchResults: (room_id) => dispatch({ type: ActionTypes.roomresults.FETCH_RESULTS_START,
                                            room_id }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PollResultsPage);
