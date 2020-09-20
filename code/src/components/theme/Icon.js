import React                          from 'react';
import styled                         from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { MdCheckBoxOutlineBlank,
         MdCheckBox,
         MdRadioButtonUnchecked,
         MdRadioButtonChecked }       from 'react-icons/md';

const propTypes = {
  type: PropTypes.oneOf(['box', 'checkbox', 'circle', 'bubble'])
};

const defaultProps = {};

const Icon = (props) => {

  const { type, ...rest } = props;

  switch (type) {
    case 'checkbox':
      return(<MdCheckBox {...rest}/>)
    case 'circle':
      return(<MdRadioButtonUnchecked {...rest}/>)
    case 'bubble':
      return(<MdRadioButtonChecked {...rest}/>)
    default:
      return(<MdCheckBoxOutlineBlank {...rest}/>)
  };
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
