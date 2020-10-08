import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Card             from './Card'
import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';


const ComponentWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid black;
`;

const InnerWrapper = styled.div`
  border: 1px solid black;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  padding: 15px;
`;

const ScrollableWrapper = styled.div`
  border: 1px solid black;
  overflow: scroll;
  height: 100%;
  width: 100%;
`;

const AgendaCardBase = ( props ) => {

  const { header, pollComponents } = props;

  const _renderHeader = (
    <HeaderWrapper>
      {header}
    </HeaderWrapper>
  );

  const _renderPollSection = (
      <ScrollableWrapper>
        {pollComponents}
      </ScrollableWrapper>
  )

  return (
    <Card color={Colors.LightBlue} height={'100%'} large>
      <InnerWrapper>
        {_renderHeader}
        {_renderPollSection}
      </InnerWrapper>
    </Card>
  )
};

export default AgendaCardBase;
