import React                          from 'react';
import styled                         from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { MdCheckBoxOutlineBlank,
         MdCheckBox,
         MdRadioButtonUnchecked,
         MdRadioButtonChecked,
         MdDone,
         MdCheckCircle }                       from 'react-icons/md';

const propTypes = {
  type: PropTypes.oneOf(['box', 'checkbox', 'circle', 'bubble', 'check',
                         'checkCircle']).isRequired,
  onClick: PropTypes.func,

  color: ExtraPropTypes.color,
  extraLarge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  extraSmall: PropTypes.bool,
};

const defaultProps = {
  onClick: undefined,
};

const sizeConfig = {
  extraLarge: '2em',
  large: '1.75em',
  medium: '1.5em' ,
  small: '1em',
  extraSmall: '0.75em'
};

const Icon = ( props ) => {

  const { type, extraLarge, large, medium, small, extraSmall, ...rest } = props;

  let size;

  if (extraLarge) { size = sizeConfig.extraLarge }
  else if (large) { size = sizeConfig.large }
  else if (small) { size = sizeConfig.small }
  else if (extraSmall) { size = size.extraSmall }
  else { size = sizeConfig.medium }

  switch (type) {
    case 'checkbox':
      return( <MdCheckBox size={size} {...rest}/> )
    case 'circle':
      return( <MdRadioButtonUnchecked size={size} {...rest}/> )
    case 'bubble':
      return(< MdRadioButtonChecked size={size} {...rest}/> )
    case 'check':
      return( <MdDone size={size} {...rest}/> )
    case 'checkCircle':
      return( <MdCheckCircle size={size} {...rest}/>)
    default:
      return( <MdCheckBoxOutlineBlank size={size} {...rest}/> )
  };
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
