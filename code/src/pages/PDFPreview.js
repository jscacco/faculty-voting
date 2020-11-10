import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import MainPage             from './format-pages/MainPage';

import PDFPreviewCard         from '../components/cards/PDFPreviewCard';

import mockData        from '../store/mockData';

const PollResultsPage = () => {

  return (
    <MainPage color={Colors.LightBlue}>
      <PDFPreviewCard room={mockData.rooms['0000']}/>
    </MainPage>
  );
}

export default PollResultsPage;
