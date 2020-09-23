import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import OptionGroup      from './OptionGroup';
import { Colors }       from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,
  getChoice: PropTypes.func,

  buttonType: PropTypes.oneOf(['bubble', 'checkbox']),
  buttonColor: ExtraPropTypes.color,

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

  fontColor: Colors.Black,
  borderColor: Colors.Blue,
};

class MultipleChoiceGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = { selected: Array(props.children.length).fill(false) }

    this._handleClick = this._handleClick.bind(this);
    this._renderOptions = this._renderOptions.bind(this);
  };


  _handleClick = ( event, id ) => {

    if (this.state.selected[id]) {
      let newSelected = this.state.selected;
      newSelected[id] = false;
      this.setState({...this.state, selected: newSelected});
    }
    else {
      let newSelected = this.state.selected;
      newSelected[id] = true;
      this.setState({...this.state, selected: newSelected});
    }

    console.log(this.state)
    if (this.props.updateSelected) { this.props.updateSelected(this.state.selected)}

  };

   _renderOptions = ( props ) => {
    const { children, ...rest } = props;

    return children.map((item, index) => {

      const onClick = (event) => this._handleClick(event, index);
      const clicked = this.state.selected[index];

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

MultipleChoiceGroup.propTypes = propTypes;
MultipleChoiceGroup.defaultProps = defaultProps;

export default MultipleChoiceGroup;
