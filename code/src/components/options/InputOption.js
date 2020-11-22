import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Option           from './Option';
import Input            from '../inputs/Input';

const propTypes = {
  inputType: PropTypes.oneOf(['inputfield', 'textarea', 'select']),
  value: PropTypes.string,

  //Option Props
  extraIcons: PropTypes.arrayOf(PropTypes.node),
  iconType: PropTypes.oneOf(['bubble', 'checkbox', 'add']),
  iconColor: ExtraPropTypes.color,
  onClick: PropTypes.func,
  clicked: PropTypes.bool,

  // Input props
  placeholder: PropTypes.string,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
  onChange: ExtraPropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  inputType: 'inputfield',
  placeholder: 'Other...'
};

const InputOption = ( props ) => {

  const { inputType, value, extraIcons,
          iconType, iconColor, onClick, clicked,
          placeholder, fontColor, backgroundColor, borderColor, onChange,
          extraSmall, small, medium, large, extraLarge } = props;

  return (
    <Option extraIcons={extraIcons} type={iconType} iconColor={iconColor}
            onClick={onClick} clicked={clicked} contentWidth={`100%`}
            extraSmall={extraSmall} small={small} medium={medium} large={large} extraLarge={extraLarge}>
      <Input type={inputType} value={value} onChange={onChange} placeholder={placeholder}
             fontColor={fontColor} backgroundColor={backgroundColor}
             borderColor={borderColor} maxLength={100}
             extraSmall={extraSmall} small={small} medium={medium} large={large} extraLarge={extraLarge}/>
    </Option>
  )

};

InputOption.propTypes = propTypes;
InputOption.defaultProps = defaultProps;

export default InputOption;
