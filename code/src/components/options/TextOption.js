import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Option           from './Option';
import Body            from '../theme/Body';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,

  buttonType: PropTypes.oneOf(['bubble', 'checkbox']),
  buttonColor: ExtraPropTypes.color,
  fontColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  onClick: undefined,
};

const TextOption = (props) => {

  const { fontColor, onClick, children, ...rest } = props;

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
