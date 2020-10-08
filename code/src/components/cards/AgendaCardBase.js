import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Card             from './Card'
import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';


const ComponentWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  padding: 15px;
`;

const PollSectionWrapper = styled.div`
  /* position: relative;
  overflow: hidden;
  min-height: 700px; */

  flex: 1;
  display: flex;
  overflow: auto;
  position: relative;
  height: 600px;
`;

const ScrollableWrapper = styled.div`
  flex-grow: 1;

  overflow: auto;

  /* for Firefox */
  min-height: 0;
`;

const AgendaCardBase = ( props ) => {

  const { header, pollComponents } = props;

  const _renderHeader = (
    <HeaderWrapper>
      {header}
    </HeaderWrapper>
  );

  const _renderPollSection = (
    <PollSectionWrapper>
      <ScrollableWrapper>
        {pollComponents}
      </ScrollableWrapper>
    </PollSectionWrapper>
  )

  return (
    <ComponentWrapper>
      <Card large color={Colors.LightBlue}>
        {_renderHeader}
        {_renderPollSection}
        <p> whats up </p>
      </Card>
    </ComponentWrapper>
  )
};

export default AgendaCardBase;
