import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import { Fonts }        from '../theme/Fonts';
import TextArea         from './TextArea';
import InputField       from './InputField';

const propTypes = {
  type: PropTypes.string,
  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
  placeholder: PropTypes.string,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
};

const defaultProps = {
  type: 'inputfield'
};

const renderInputField = (props) => (
  <InputField {...props}/>
);

const renderTextArea = (props) => (
  <TextArea {...props}/>
);

const Input = ( props ) => {

  const { type } = props;

  return ((type === 'textarea') ? renderTextArea(props) : renderInputField(props));
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
