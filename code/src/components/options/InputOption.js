import React            from 'react';
import PropTypes        from 'prop-types';

import Option           from './Option';
import Input            from '../inputs/Input';

const propTypes = {
  inputType: PropTypes.oneOf(['inputfield', 'textarea']),
};

const defaultProps = {
  inputType: 'inputfield',
};

const InputOption = ( props ) => {

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
