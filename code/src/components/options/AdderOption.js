import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import InputOption            from './InputOption';

const propTypes = {

  //Option Props
  iconColor: ExtraPropTypes.color,
  onClick: PropTypes.func,

  // Input props
  placeholder: PropTypes.string,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
};

const AdderOption = ( props ) => {

  const { iconColor, onClick,
          placeholder, fontColor, backgroundColor, borderColor,
          extraSmall, small, medium, large, extraLarge } = props;

  return (
    <InputOption inputType={'select'} iconType={'add'}
                 iconColor={iconColor} onClick={onClick}
                 placeholder={placeholder} fontColor={fontColor}
                 backgroundColor={backgroundColor} borderColor={borderColor}
                 extraSmall={extraSmall} small={small} medium={medium} large={large} extraLarge={extraLarge}/>
  )

};

AdderOption.propTypes = propTypes;
AdderOption.defaultProps = defaultProps;

export default AdderOption;
