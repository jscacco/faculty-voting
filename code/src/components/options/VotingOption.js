import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import ExtraPropTypes   from 'react-extra-prop-types';

import Icon           from '../theme/Icon';
import { Colors }     from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,
  submitted: PropTypes.bool,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {};

const ComponentWrapper = st yled.div``;

const submitIcon = (
  <Icon type={'checkCircle'} color={Colors.Green}/>
)

const VotingOption = ( props ) => {

  const { children, submitted, small, medium, large, extraLarge } = props;

  const extraIcons = submitted ? [ submitIcon ] : undefined;

  const childProps = { small: small, medium: medium,
                       large: large, extraLarge: extraLarge,
                       extraIcons: extraIcons};

  return (
    <ComponentWrapper>
      {React.Children.map (children, (child) => React.cloneElement(child, {...childProps}))}
    </ComponentWrapper>
  )
};

VotingOption.propTypes = propTypes;
VotingOption.defaultProps = defaultProps;

export default VotingOption;
