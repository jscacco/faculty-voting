import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import OptionGroup      from './OptionGroup';
import { Colors }       from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,

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
  buttonType: 'bubble',
  buttonColor: ExtraPropTypes.color,

  inputType: 'inputfield',
  fontColor: Colors.Black,
  borderColor: Colors.Blue,
};
class SingleChoiceGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = { selected: null }

    this._handleClick = this._handleClick.bind(this);
    this._renderOptions = this._renderOptions.bind(this);
  };


  _handleClick = ( id ) => {

    if (this.state.selected === id) { this.setState({...this.state, selected: null}); }
    else { this.setState({...this.state, selected: id}); }

    if (this.props.onClick) { this.props.onClick(id)}

  };

   _renderOptions = ( props ) => {
    const { children, ...rest } = props;

    return children.map((item, index) => {

      const onClick = () => this._handleClick(index);
      const clicked = this.state.selected === index;

      const itemProps = { onClick: onClick,
                          clicked: clicked};
      return (
        React.cloneElement(item, {...itemProps})
      );
    });
  };

  render() {
    return (
      <OptionGroup {...this.props}>
        {this._renderOptions(this.props)}
      </OptionGroup>
    )
  }
};

SingleChoiceGroup.propTypes = propTypes;
SingleChoiceGroup.defaultProps = defaultProps;

export default SingleChoiceGroup;
