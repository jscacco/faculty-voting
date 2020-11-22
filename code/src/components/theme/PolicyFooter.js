import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import history          from '../../history';

import { Colors }       from './Colors';
import Body            from './Body';

const propTypes = {
  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

const defaultProps = {};

const ComponentWrapper = styled.div`
  padding-bottom: 2vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PolicyFooter = ( props ) => {

  return (
    <ComponentWrapper>
      <Body color={Colors.Buff}
            bottomBorder borderColor={Colors.Buff}
            onClick={() => history.push('/PrivacyPolicy')}
            {...props}>
        Privacy Policy
      </Body>
    </ComponentWrapper>
  )
};

PolicyFooter.propTypes = propTypes;
PolicyFooter.defaultProps = defaultProps;

export default PolicyFooter;
