import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Icon             from '../theme/Icon';
import { Colors }       from '../theme/Colors';
import Bubble           from '../buttons/Bubble';
import CheckBox         from '../buttons/CheckBox';

import OptionBase       from './OptionBase';

const propTypes = {
  children: PropTypes.node,
  extraIcons: PropTypes.arrayOf(PropTypes.node),
  type: PropTypes.oneOf(['bubble', 'checkbox', 'add']),

  iconColor: ExtraPropTypes.color,
  onClick: PropTypes.func,
  clicked: PropTypes.bool,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  type: 'checkbox',
  iconColor: Colors.Black,
  onClick: undefined,
  clicked: false
};

const bubble = ( props ) => {

  const { iconColor, onClick, clicked,
          extraSmall, small, medium, large, extraLarge } = props;

  return (
    <Bubble color={iconColor} onClick={onClick} clicked={clicked}/>
  )
};

const checkbox = ( props ) => {

  const { iconColor, onClick, clicked,
          extraSmall, small, medium, large, extraLarge } = props;

  return (
    <CheckBox color={iconColor} onClick={onClick} clicked={clicked}/>
  )

};

const add = ( props ) => {

  const { iconColor, onClick,
           extraSmall, small, medium, large, extraLarge } = props;

  return (
    <Icon type={'addCircle'} color={iconColor} onClick={onClick}/>
  )

};

const Option = ( props ) => {

  const { type, children, extraIcons,
          extraSmall, small, medium, large, extraLarge } = props;

  let iconButton;
  switch (type) {
    case 'bubble':
      iconButton = bubble(props);
      break;
    case 'add':
      iconButton = add(props);
      break;
    default:
      iconButton = checkbox(props);
  }

  return (
    <OptionBase iconButton={iconButton} extraIcons={extraIcons}
                extraSmall={extraSmall} small={small} medium={medium} large={large} extraLarge={extraLarge}>
      {children}
    </OptionBase>
  );
}

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

export default Option;
