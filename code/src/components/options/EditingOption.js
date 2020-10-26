import React            from 'react';
import PropTypes        from 'prop-types';
import styled           from 'styled-components';
import ExtraPropTypes   from 'react-extra-prop-types';

import Icon           from '../theme/Icon';
import { Colors }     from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func,

  iconColor: ExtraPropTypes.color,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {};

const ComponentWrapper = styled.div``;

const deleteIcon = (onDelete) => (
  <Icon type={'x'} color={Colors.Blue} onClick={onDelete}/>
)

const EditingOption = ( props ) => {

  const { children, onDelete,
          iconColor, fontColor, backgroundColor, borderColor,
          extraSmall, small, medium, large, extraLarge } = props;

  const extraIcons = [ deleteIcon(onDelete) ]

  const childProps = { iconColor: iconColor, fontColor: fontColor,
                       backgroundColor: backgroundColor, borderColor: borderColor,
                       extraSmall: extraSmall, small: small, medium: medium,
                       large: large, extraLarge: extraLarge,
                       extraIcons: extraIcons, };

  return (
    <ComponentWrapper>
      {React.Children.map (children, (child) => React.cloneElement(child, {...childProps}))}
    </ComponentWrapper>
  )
};

EditingOption.propTypes = propTypes;
EditingOption.defaultProps = defaultProps;

export default EditingOption;
