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

class SingleChoiceGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = { selected: null }

    this._handleClick = this._handleClick.bind(this);
    this._renderOptions = this._renderOptions.bind(this);
  };


  async _handleClick( event, id ) {

    if (this.state.selected === id) { await this.setState({...this.state, selected: null}); }
    else { await this.setState({...this.state, selected: id}); }

    if (this.props.updateSelected) { this.props.updateSelected(this.state.selected) }

  };

   _renderOptions = ( props ) => {
    const { children, ...rest } = props;

    return children.map((item, index) => {

      const onClick = (event) => this._handleClick(event, index);
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
