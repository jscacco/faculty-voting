import React            from 'react';
import PropTypes        from 'prop-types';

import TextArea         from './TextArea';
import InputField       from './InputField';

const propTypes = {
  type: PropTypes.string,
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

  return (
    (type === 'textarea') ? renderTextArea(props) : renderInputField(props)
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
