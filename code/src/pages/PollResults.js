import React, { useEffect }                from 'react';
import styled               from 'styled-components';
import ReactDOMServer       from "react-dom/server";


import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import MainPage             from './format-pages/MainPage';

import PollResultsCard         from '../components/cards/PollResultsCard';


const PollResultsPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';
  const pollcode = props.match.params.pollcode || '00';

  useEffect(() =>  {
    props.onFetchResults(roomcode, pollcode);
  }, [])

  return (
    <MainPage>
      <PollResultsCard pollResults={props.pollResults} toPDF={props.toPDF}/>
    </MainPage>
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
