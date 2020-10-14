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
         MdClear,
         MdDragHandle,
         MdRemoveCircleOutline,
         MdEdit,
         MdSave }                     from 'react-icons/md';

import { IoMdTrash }                  from 'react-icons/io'

const propTypes = {
  type: PropTypes.oneOf(['box', 'checkbox', 'circle', 'bubble', 'check',
                         'checkCircle', 'fullCircle', 'addCircle', 'x',
                         'dragHandle', 'xCircle', 'edit', 'save' ]).isRequired,
  onClick: PropTypes.func,

  color: ExtraPropTypes.color,
  size: PropTypes.string,

  twoExtraLarge: PropTypes.bool,
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
  twoExtraLarge: '2.75em',
  extraLarge: '2em',
  large: '1.75em',
  medium: '1.5em' ,
  small: '1em',
  extraSmall: '0.75em'
};

const Icon = ( props ) => {

  const { type, size, twoExtraLarge, extraLarge, large,
          medium, small, extraSmall, ...rest } = props;

  let baseSize;

  if (twoExtraLarge) { baseSize = sizeConfig.twoExtraLarge }
  else if (extraLarge) { baseSize = sizeConfig.extraLarge }
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
    case 'addCircle':
      return( <MdAddCircleOutline size={size ? size : baseSize} {...rest}/>)
    case 'x':
      return( <MdClear size={size ? size : baseSize} {...rest}/>)
    case 'dragHandle':
      return( <MdDragHandle size={size ? size : baseSize} {...rest}/>)
    case 'xCircle':
      return( <MdRemoveCircleOutline size={size ? size : baseSize} {...rest}/>)
    case 'trash':
      return( <IoMdTrash size={size ? size : baseSize} {...rest}/>)
    case 'edit':
      return( <MdEdit size={size ? size : baseSize} {...rest}/>)
    case 'save':
      return( <MdSave size={size ? size : baseSize} {...rest}/>)
    default:
      return( <MdCheckBoxOutlineBlank size={size ? size : baseSize} {...rest}/> )
  };
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
