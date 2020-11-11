import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body'

const Wrapper = styled.div`
  background: ${Colors.Blue};
  border-top: 2px solid ${Colors.Buff};
  width: 100%;
  padding: 2px;

  display: flex;
  justify-content: center;
  height: 3vh;
`;

const PageFooter = () => {

  return (
    <Wrapper>
      <Body twoExtraSmall color={Colors.Buff}> CS410: Faculty Voting - Fall 2020 </Body>
    </Wrapper>
  )
};


export default PageFooter;
