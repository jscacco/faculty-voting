import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import MainPage             from './format-pages/MainPage';

import RoomResultsCard         from '../components/cards/RoomResultsCard';
import ViewportHandler      from './format-pages/ViewportHandler';

const getSize = (viewport) => {

  let size = {};
  switch (viewport) {
    case 'mobile':
      size.extraSmall = true;
      break;
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
  console.log('here')
  console.log(props.viewport)

  return <RoomResultsCard {...size} roomResults={props.roomResults}/>
}

const PollResultsPage = ( props ) => {

  const { roomResults } = props

  const roomcode = props.match.params.roomcode || '0000';


  useEffect(() =>  {
    props.onFetchResults(roomcode);
  }, [])

  console.log(props);

  return (
    <ViewportHandler>
      <MainPage>
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
