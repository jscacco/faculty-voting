import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import TextArea         from './TextArea';
import InputField       from './InputField';

const propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,

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


class Input extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      value: props.value
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange = (event) => {

    console.log('onChage')
    this.setState({
      value: event.target.value
    })

    this.props.onChange && this.props.onChange(event);
  }

  render() {

    const inputProps = { ...this.props,
                         value: this.state.value,
                         onChange: this.onChange
                       }

    return (
      this.props.type === 'textarea' ? <TextArea {...inputProps}/> : <InputField {...inputProps}/>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
