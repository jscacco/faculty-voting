import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Option           from './Option';
import Body             from '../theme/Body';

const propTypes = {
  children: PropTypes.node,

  //Option Props
  extraIcons: PropTypes.arrayOf(PropTypes.node),
  iconType: PropTypes.oneOf(['bubble', 'checkbox', 'add']),
  iconColor: ExtraPropTypes.color,
  onClick: PropTypes.func,
  clicked: PropTypes.bool,

  // Body props
  fontColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
};

const TextOption = ( props ) => {

  const { children, extraIcons,
          iconType, iconColor, onClick, clicked,
          fontColor,
          small, medium, large, extraLarge } = props;

  return (
    <Option extraIcons={extraIcons} type={iconType} iconColor={iconColor}
            onClick={onClick} clicked={clicked}
            small={small} medium={medium} large={large} extraLarge={extraLarge}>
      <Body color={fontColor}
            small={small} medium={medium} large={large} extraLarge={extraLarge}>
          {children}
      </Body>
    </Option>
  )

};

TextOption.propTypes = propTypes;
TextOption.defaultProps = defaultProps;

export default TextOption;
