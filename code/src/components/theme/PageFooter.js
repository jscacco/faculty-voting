import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body'

const propTypes = {
  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};
const defaultProps = {};

const Wrapper = styled.div`
  background: ${Colors.Blue};
  border-top: 2px solid ${Colors.Buff};
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

PageFooter.propTypes = propTypes;
PageFooter.defaultProps = defaultProps;

export default PageFooter;
