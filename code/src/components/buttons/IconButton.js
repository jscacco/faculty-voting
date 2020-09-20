import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Icon             from '../theme/Icon';

const propTypes = {
  onClick: PropTypes.func,

  icon: PropTypes.string.isRequired,
  clickedIcon: PropTypes.string.isRequired,
  color: ExtraPropTypes.color,

  extraLarge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  extraSmall: PropTypes.bool,
};

const defaultProps = {
  onClick: undefined,

  color: Colors.Black,
};

const sizeConfig = {
  extraLarge: '2em',
  large: '1.75em',
  medium: '1.5em' ,
  small: '1em',
  extraSmall: '0.75em'
};

class IconButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = { clicked: false };

    this._renderClicked = this._renderClicked.bind(this);
    this._renderUnClicked = this._renderUnClicked.bind(this);
  };

  _handleClick = ( event ) => {

    const { clicked } = this.state;

    this.setState({ clicked: !clicked });
    if (this.props.onClick) { this.props.onClick(event); };
  };

  _renderClicked = (size) => (
      <Icon type={this.props.clickedIcon}
            onClick={this._handleClick}
            size={size}
            color={this.props.color} />
  );

  _renderUnClicked = (size) => (
      <Icon type={this.props.icon}
            onClick={this._handleClick}
            size={size}
            color={this.props.color} />
  );

  render() {

    const { extraLarge, large, medium, small, extraSmall } = this.props;

    let size;

    if (extraLarge) { size = sizeConfig.extraLarge }
    else if (large) { size = sizeConfig.large }
    else if (small) { size = sizeConfig.small }
    else if (extraSmall) { size = size.extraSmall }
    else { size = sizeConfig.medium }

    return(this.state.clicked ? this._renderClicked(size) : this._renderUnClicked(size));
  }
}

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
