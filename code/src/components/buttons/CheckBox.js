import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Icon       from '../theme/Icon';

const propTypes = {
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

const sizeConfig = {
  extraLarge: '2em',
  large: '1.75em',
  medium: '1.5em' ,
  small: '1em',
  extraSmall: '0.75em'
};

const renderClicked = ( props ) => (
  <Icon onClick={props.onClick}
        type={'checkbox'}
        size={props.size}
        color={props.color} />
);

const renderUnClicked = ( props ) => (
  <Icon onClick={props.onClick}
        type={'box'}
        size={props.size}
        color={props.color} />
);

const CheckBox = ( props ) => {

  const { extraLarge, large, medium, small, extraSmall, clicked } = props;

  let size;

  if (extraLarge) { size = sizeConfig.extraLarge }
  else if (large) { size = sizeConfig.large }
  else if (small) { size = sizeConfig.small }
  else if (extraSmall) { size = size.extraSmall }
  else { size = sizeConfig.medium }

  return(clicked ? renderClicked({ ...props, size: size }) : renderUnClicked({ ...props, size: size }));

}

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;
