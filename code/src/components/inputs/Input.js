import React            from 'react';
import styled           from 'styled-components';

import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import TextArea         from './TextArea';
import InputField       from './InputField';

const propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,

  label: PropTypes.string,
  placeholder: PropTypes.string,

  labelColor: ExtraPropTypes.color,
  placeholderColor: ExtraPropTypes.color,
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
  type: 'inputfield',
  labelColor: Colors.Blue,
};

const LabelWrapper = styled.div`
  padding-top: 4px;
`;
const ComponentWrapper = styled.div``;


class Input extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      value: props.value
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange = (event) => {

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

    const component = this.props.type === 'textarea' ? <TextArea {...inputProps}/> : <InputField {...inputProps}/>;

    return (
      this.props.label ?
        <ComponentWrapper>
          <LabelWrapper>
            <Body color={this.props.labelColor} {...this.props}>
              {this.props.label}
            </Body>
          </LabelWrapper>
          {component}
        </ComponentWrapper> :
        <ComponentWrapper>
          {component}
        </ComponentWrapper>

    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
