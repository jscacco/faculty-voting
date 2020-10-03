import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Option           from './Option';
import Input            from '../inputs/Input';

const propTypes = {
  inputType: PropTypes.oneOf(['inputfield', 'textarea']),
  onClick: PropTypes.func,

  submitted: PropTypes.bool,

  // Button props
  clicked: PropTypes.bool,
  buttonType: PropTypes.oneOf(['bubble', 'checkbox']),
  buttonColor: ExtraPropTypes.color,

  // Input props
  placeholder: PropTypes.string,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  inputType: 'inputfield',
};

const InputOption = ( props ) => {

  const { inputType, onClick,
          clicked, buttonType, buttonColor, submitted,
          placeholder, fontColor, backgroundColor, borderColor,
          small, medium, large, extraLarge } = props;

  return (
    <Option onClick={onClick} clicked={clicked} submitted={submitted}
            buttonType={buttonType} buttonColor={buttonColor}
            small={small} medium={medium} large={large} extraLarge={extraLarge}>
      <Input type={inputType} placeholder={placeholder}
             fontColor={fontColor} backgroundColor={backgroundColor}
             borderColor={borderColor}
             small={small} medium={medium} large={large} extraLarge={extraLarge}/>
    </Option>
  )

};

InputOption.propTypes = propTypes;
InputOption.defaultProps = defaultProps;

export default InputOption;
