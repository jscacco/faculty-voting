import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Option           from './Option';
import Input            from '../inputs/Input';

const propTypes = {
  onClick: PropTypes.func,

  buttonType: PropTypes.oneOf(['bubble', 'checkbox']),
  buttonColor: ExtraPropTypes.color,

  inputType: PropTypes.oneOf(['inputfield', 'textarea']),
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  onClick: undefined,
  inputType: 'inputfield',
};

const InputOption = (props) => {

  const { inputType, onClick, ...rest } = props;

  return (
    <Option {...props}>
      <Input type={inputType} {...rest}/>
    </Option>
  )

};

InputOption.propTypes = propTypes;
InputOption.defaultProps = defaultProps;

export default InputOption;
