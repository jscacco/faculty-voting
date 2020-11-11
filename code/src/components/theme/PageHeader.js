import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './Colors';
import Body             from './Body';
import Jumbo            from './Jumbo';
import logo     from './logo.png';

const Wrapper = styled.div`
  background: ${Colors.White};
  border-bottom: 5px solid ${Colors.Buff};
  width: 100%;
  padding: 5px;
  height: 7vh;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const PageHeader = () => {

  return (
    <Wrapper>
      <img src={logo} alt={'Logo'} height={'50vh'}/>
    </Wrapper>
  )
};


export default PageHeader;
