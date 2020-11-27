import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from './Colors';

import logo             from './logo.png';
import Button           from '../buttons/Button';
import history          from '../../history';

import { signOutCurrentUser } from '../../LoginUtils';

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
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  position: relative;
  /* minWidth: 200px; */
`;

const PageHeader = (props) => {

  return (
    <Wrapper>
      <a href="/login">
        <img src={logo} alt={'Logo'} height={'50vh'}/>
      </a>
      <ButtonWrapper>
        <a href="/login">
          <Button twoExtraSmall onClick={signOutCurrentUser}>
            Sign Out
          </Button>
        </a>
      </ButtonWrapper>
    </Wrapper>
  )
};

PageHeader.propTypes = propTypes;
PageHeader.propTypes = defaultProps;

export default PageHeader;
