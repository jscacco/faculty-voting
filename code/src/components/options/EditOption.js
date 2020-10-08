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

const ComponentWrapper = styled.div``;

const deleteIcon = (
  <Icon type={'x'} color={Colors.Blue}/>
)

const EditOption = ( props ) => {

  const { children, small, medium, large, extraLarge } = props;

  const extraIcons = [ deleteIcon ]

  const childProps = { small: small, medium: medium,
                       large: large, extraLarge: extraLarge,
                       extraIcons: extraIcons};

  return (
    <ComponentWrapper>
      {React.Children.map (children, (child) => React.cloneElement(child, {...childProps}))}
    </ComponentWrapper>
  )
};

EditOption.propTypes = propTypes;
EditOption.defaultProps = defaultProps;

export default EditOption;
