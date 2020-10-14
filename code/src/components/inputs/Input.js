import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import TextArea         from './TextArea';
import InputField       from './InputField';

const propTypes = {
  type: PropTypes.string,

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
  type: 'inputfield'
};

const renderInputField = (props) => {

  const { placeholder, fontColor, backgroundColor, borderColor,
          extraSmall, small, medium, large, extraLarge } = props;

  return (
    <InputField placeholder={placeholder} fontColor={fontColor}
                backgroundColor={backgroundColor} borderColor={borderColor}
                extraSmall={extraSmall} small={small} medium={medium}
                large={large} extraLarge={extraLarge}/>
  );
}

const renderTextArea = (props) => {

  const { placeholder, fontColor, backgroundColor, borderColor,
          extraSmall, small, medium, large, extraLarge, value } = props;

  return (
    <TextArea placeholder={placeholder} fontColor={fontColor}
                backgroundColor={backgroundColor} borderColor={borderColor}
                extraSmall={extraSmall} small={small} medium={medium}
                large={large} extraLarge={extraLarge} value={value}/>
  );
}

const Input = ( props ) => {

  const { type } = props;

  return (
    (type === 'textarea') ? renderTextArea(props) : renderInputField(props)
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
