import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import MainPage             from './format-pages/MainPage';

import PDFPreviewCard         from '../components/cards/PDFPreviewCard';

import mockData        from '../store/mockData';

const Wrapper = styled.div`
  border: 1px solid black;
  height: 11in;
  width: 8.5in;
`;

const PollResultsPage = () => {

  return (
    <Wrapper>
      <PDFPreviewCard room={mockData.rooms['0000']}/>
    </Wrapper>
  );
}

export default PollResultsPage;
