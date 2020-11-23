import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from './Colors';

import logo             from './logo.png';

const propTypes = {
  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

const defaultProps = {};

const Wrapper = styled.div`
  background: ${Colors.White};
  border-bottom: 5px solid ${Colors.Buff};
  padding: 5px;
  height: 7vh;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const PageHeader = () => {

  return (
    <Wrapper>
      <a href="/login">
        <img src={logo} alt={'Logo'} height={'50vh'}/>
      </a>
    </Wrapper>
  )
};

PageHeader.propTypes = propTypes;
PageHeader.propTypes = defaultProps;

export default PageHeader;
