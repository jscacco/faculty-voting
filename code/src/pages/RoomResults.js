import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import MainPage             from './format-pages/MainPage';

import RoomResultsCard         from '../components/cards/RoomResultsCard';

const PollResultsPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';

  useEffect(() =>  {
    props.onFetchResults(roomcode);
  }, [])

  console.log(props);

  return (
    <MainPage color={Colors.LightBlue}>
      <RoomResultsCard roomResults={props.roomResults}/>
    </MainPage>
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
