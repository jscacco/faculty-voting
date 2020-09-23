import React                          from 'react';
import styled                         from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { MdCheckBoxOutlineBlank,
         MdCheckBox,
         MdRadioButtonUnchecked,
         MdRadioButtonChecked,
         MdDone }                       from 'react-icons/md';

const propTypes = {
  type: PropTypes.oneOf(['box', 'checkbox', 'circle', 'bubble', 'check']).isRequired,
  onClick: PropTypes.func,

  color: ExtraPropTypes.color,
  size: PropTypes.string,
};

const defaultProps = {
  onClick: undefined,
};

const Icon = ( props ) => {

  const { type, ...rest } = props;

  switch (type) {
    case 'checkbox':
      return( <MdCheckBox {...rest}/> )
    case 'circle':
      return( <MdRadioButtonUnchecked {...rest}/> )
    case 'bubble':
      return(< MdRadioButtonChecked {...rest}/> )
    case 'check':
      return( <MdDone {...rest}/> )
    default:
      return( <MdCheckBoxOutlineBlank {...rest}/> )
  };
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
