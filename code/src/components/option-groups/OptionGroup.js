import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Group            from '../groups/Group';
import { Colors }       from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,
  selectedOptions: PropTypes.arrayOf(PropTypes.bool),
  onSelect: PropTypes.func, // for exterior use
  disabled: PropTypes.bool,

  type: PropTypes.oneOf(['single', 'multiple']),

  // Option Props
  iconColor: ExtraPropTypes.color,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  type: 'single',
  iconColor: Colors.Blue,

  fontColor: Colors.Black,
  borderColor: Colors.Blue,
};

class OptionGroup extends React.Component {

  constructor(props) {
    super(props);

    const selectedOptions = props.selectedOptions ? props.selectedOptions.map((item) => item) :
                                      Array(props.children.length).fill(false);

    this.state = { selectedOptions: selectedOptions }

    this._handleClickMulti = this._handleClickMulti.bind(this);
    this._handleClickSngl = this._handleClickSngl.bind(this);

    this._handleClick = this._handleClick.bind(this);
    this._renderOptions = this._renderOptions.bind(this);
  };

  async _handleClickMulti ( event, id ) {

    let newSelected = this.state.selectedOptions;

    if (this.state.selectedOptions[id]) { newSelected[id] = false; }
    else { newSelected[id] = true; }

    await this.setState({...this.state, selectedOptions: newSelected});

    if (this.props.onSelect) { this.props.onSelect(this.state.selectedOptions)}

  }

  async _handleClickSngl ( event, id ) {

    let newSelected;

    if (this.state.selectedOptions[id]) {
      newSelected = this.state.selectedOptions;
      newSelected[id] = false;
    }
    else {
      newSelected = new Array(this.state.selectedOptions.length).fill(false);
      newSelected[id] = true;
    }

    await this.setState({...this.state, selectedOptions: newSelected});

    if (this.props.onSelect) { this.props.onSelect(this.state.selectedOptions)}
  }


  _handleClick = ( event, id ) => {

    if (this.props.disabled) { return; }

    this.props.type === 'multiple' ? this._handleClickMulti(event, id) :
                                     this._handleClickSngl(event, id);
  };

   _renderOptions = ( props ) => {
    const { children, iconColor, ...rest } = props;

    return React.Children.map(children, (item, index) => {

      const onClick = (event) => this._handleClick(event, index);
      const clicked = this.state.selectedOptions[index];
      const iconType = (this.props.type === 'multiple') ? 'checkbox' : 'bubble';

      const itemProps = { onClick: onClick,
                          clicked: clicked,
                          iconColor: iconColor,
                          iconType: iconType};
      return (
        React.cloneElement(item, {...itemProps})
      );
    });
  };

  render() {
    return (
      <Group {...this.props}>
        {this._renderOptions(this.props)}
      </Group>
    )
  }
};

OptionGroup.propTypes = propTypes;
OptionGroup.defaultProps = defaultProps;

export default OptionGroup;