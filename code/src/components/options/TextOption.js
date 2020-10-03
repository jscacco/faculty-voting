import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Option           from './Option';
import Body            from '../theme/Body';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,

  submitted: PropTypes.bool,

  // Button props
  clicked: PropTypes.bool,
  buttonType: PropTypes.oneOf(['bubble', 'checkbox']),
  buttonColor: ExtraPropTypes.color,

  // Body props
  fontColor: ExtraPropTypes.color, // color in Body.js

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {};

const TextOption = (props) => {

  const { children, onClick, clicked, buttonType, buttonColor, submitted,
          fontColor, small, medium, large, extraLarge } = props;

  return (
    <Option onClick={onClick} clicked={clicked} submitted={submitted}
            buttonType={buttonType} buttonColor={buttonColor}
            small={small} medium={medium} large={large} extraLarge={extraLarge}>
      <Body color={fontColor} small={small} medium={medium}
                              large={large} extraLarge={extraLarge}>
        {children}
      </Body>
    </Option>
  )

};

TextOption.propTypes = propTypes;
TextOption.defaultProps = defaultProps;

export default TextOption;
