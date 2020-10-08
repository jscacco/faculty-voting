import React                          from 'react';
import styled                         from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { MdCheckBoxOutlineBlank,
         MdCheckBox,
         MdRadioButtonUnchecked,
         MdRadioButtonChecked,
         MdDone,
         MdCheckCircle,
         MdLens,
         MdAddCircleOutline,
         MdClear}                       from 'react-icons/md';

const propTypes = {
  type: PropTypes.oneOf(['box', 'checkbox', 'circle', 'bubble', 'check',
                         'checkCircle', 'fullCircle', 'addCircle', 'x']).isRequired,
  onClick: PropTypes.func,

  color: ExtraPropTypes.color,
  size: PropTypes.string,
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

  const { type, size, extraLarge, large, medium, small, extraSmall, ...rest } = props;

  let baseSize;

  if (extraLarge) { baseSize = sizeConfig.extraLarge }
  else if (large) { baseSize = sizeConfig.large }
  else if (small) { baseSize = sizeConfig.small }
  else if (extraSmall) { baseSize = size.extraSmall }
  else { baseSize = sizeConfig.medium }

  switch (type) {
    case 'checkbox':
      return( <MdCheckBox size={size ? size : baseSize} {...rest}/> )
    case 'circle':
      return( <MdRadioButtonUnchecked size={size ? size : baseSize} {...rest}/> )
    case 'bubble':
      return(< MdRadioButtonChecked size={size ? size : baseSize} {...rest}/> )
    case 'check':
      return( <MdDone size={size ? size : baseSize} {...rest}/> )
    case 'checkCircle':
      return( <MdCheckCircle size={size ? size : baseSize} {...rest}/>)
    case 'fullCircle':
      return( <MdLens size={size ? size : baseSize} {...rest}/>)
    case 'addCirlce':
      return( <MdAddCircleOutline size={size ? size : baseSize} {...rest}/>)
    case 'x':
      return( <MdClear size={size ? size : baseSize} {...rest}/>)
    default:
      return( <MdCheckBoxOutlineBlank size={size ? size : baseSize} {...rest}/> )
  };
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
