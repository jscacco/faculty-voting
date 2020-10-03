import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import OptionGroupBase      from './OptionGroupBase';
import { Colors }       from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,
  updateSelected: PropTypes.func,

  type: PropTypes.oneOf(['single', 'multiple']),

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
  type: 'single',
  buttonColor: Colors.Blue,

  fontColor: Colors.Black,
  borderColor: Colors.Blue,
};

class OptionGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = { selected: Array(props.children.length).fill(false) }

    this._handleClickMulti = this._handleClickMulti.bind(this);
    this._handleClickSngl = this._handleClickSngl.bind(this);

    this._handleClick = this._handleClick.bind(this);
    this._renderOptions = this._renderOptions.bind(this);
  };

  async _handleClickMulti ( event, id ) {

    let newSelected = this.state.selected;

    if (this.state.selected[id]) { newSelected[id] = false; }
    else { newSelected[id] = true; }

    await this.setState({...this.state, selected: newSelected});

    if (this.props.updateSelected) { this.props.updateSelected(this.state.selected)}

  }

  async _handleClickSngl ( event, id ) {

    let newSelected;

    if (this.state.selected[id]) {
      newSelected = this.state.selected;
      newSelected[id] = false;
    }
    else {
      newSelected = new Array(this.state.selected.length).fill(false);
      newSelected[id] = true;
    }

    await this.setState({...this.state, selected: newSelected});

    if (this.props.updateSelected) { this.props.updateSelected(this.state.selected)}
  }


  _handleClick = ( event, id ) => {

    this.props.type === 'multiple' ? this._handleClickMulti(event, id) : this._handleClickSngl(event, id);
  };

   _renderOptions = ( props ) => {
    const { children, buttonColor, submission, ...rest } = props;

    return children.map((item, index) => {

      const submitted = submission ? submission[index] : false;
      const onClick = (event) => this._handleClick(event, index);
      const clicked = this.state.selected[index];
      const buttonType = (this.props.type === 'multiple') ? 'checkbox' : 'bubble';

      const itemProps = { onClick: onClick,
                          clicked: clicked,
                          buttonType: buttonType,
                          submitted: submitted};
      return (
        React.cloneElement(item, {...itemProps})
      );
    });
  };

  render() {
    // console.log('render')
    return (
      <OptionGroupBase {...this.props}>
        {this._renderOptions(this.props)}
      </OptionGroupBase>
    )
  }
};

OptionGroup.propTypes = propTypes;
OptionGroup.defaultProps = defaultProps;

export default OptionGroup;
