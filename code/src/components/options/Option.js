import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Bubble           from '../buttons/Bubble';
import CheckBox         from '../buttons/CheckBox';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  clicked: PropTypes.bool,

  buttonType: PropTypes.oneOf(['bubble', 'checkbox']),
  buttonColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  buttonColor: Colors.Black,
  onClick: undefined,
  clicked: false,
  buttonType: 'bubble',
};

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${({padding}) => padding};
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const optionConfig = {
  small: { padding: `12px`},
  medium: { padding: `16px`},
  large: { padding: `20px`},
  extraLarge: { padding: `28px`},
};

const _renderBubble = ( props ) => {

  const { buttonColor, ...rest } = props;

  return (
    <Bubble color={buttonColor} {...rest}/>
  );
};

const _renderCheckBox = ( props ) => {

  const { buttonColor, ...rest } = props;

  return (
    <CheckBox color={buttonColor} {...rest}/>
  );
};

const Option = (props) => {

  const { children, buttonType, small, medium, large, extraLarge } = props;

  let config;

  if (extraLarge) {config = optionConfig.extraLarge}
  else if (large) {config = optionConfig.large}
  else if (small) {config = optionConfig.small}
  else {config = optionConfig.medium}

  return (
    <OptionWrapper>
      <ButtonWrapper padding={config.padding}>
        {(buttonType === 'bubble') ? _renderBubble(props) : _renderCheckBox(props)}
      </ButtonWrapper>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </OptionWrapper>
  )

};

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

export default Option;
