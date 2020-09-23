import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Option           from './Option';
import Body            from '../theme/Body';

const propTypes = {
  children: PropTypes.node,

  fontColor: ExtraPropTypes.color
};

const defaultProps = {};

const TextOption = (props) => {

  const { children, onClick, fontColor, ...rest } = props;

  return (
    <Option {...props}>
      <Body color={fontColor} {...rest}>
        {children}
      </Body>
    </Option>
  )

};

TextOption.propTypes = propTypes;
TextOption.defaultProps = defaultProps;

export default TextOption;
