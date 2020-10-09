import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Icon       from '../theme/Icon';

const propTypes = {
  onClick: PropTypes.func,
  clicked: PropTypes.bool,

  color: ExtraPropTypes.color,

  extraLarge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  extraSmall: PropTypes.bool,
};

const defaultProps = {
  onClick: undefined,
  clicked: false,
  color: Colors.Black,
};

const renderClicked = ( props ) => (
  <Icon type={'checkbox'}
        {...props} />
);

const renderUnClicked = ( props ) => (
  <Icon type={'box'}
        {...props} />
);

const CheckBox = ( props ) => {

  const { clicked, ...rest } = props;

  return(clicked ? renderClicked(rest) : renderUnClicked(rest));

}

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;
