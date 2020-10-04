import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Icon             from '../theme/Icon';
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

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${({padding}) => padding};
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
`;


const DummyIcon = styled.div`
  height: ${({size}) => size};
  width: ${({size}) => size};
`;

const optionConfig = {
  small: { padding: `12px`,
           iconSize: '1em' },
  medium: { padding: `16px`,
           iconSize: '1.5em'},
  large: { padding: `20px`,
           iconSize: '1.75em'},
  extraLarge: { padding: `28px`,
           iconSize: '2em'},
};

const _renderBubble = ( props ) => {

  const { onClick, clicked, buttonColor,
          small, medium, large, extraLarge } = props;

  return (
    <Bubble onClick={onClick} clicked={clicked} color={buttonColor}
            small={small} medium={medium} large={large} extraLarge={extraLarge}/>
  );
};

const _renderCheckBox = ( props ) => {

  const { onClick, clicked, buttonColor,
          small, medium, large, extraLarge } = props;

  return (
    <CheckBox onClick={onClick} clicked={clicked} color={buttonColor}
            small={small} medium={medium} large={large} extraLarge={extraLarge}/>
  );
};

const _renderSubmitIcon = ( props ) => {
  const { config, small, medium, large, extraLarge } = props;

  return(
    <IconWrapper padding={config.padding}>
      <Icon type={'checkCircle'} color={Colors.Green}
            small={small} medium={medium} large={large} extraLarge={extraLarge}/>
    </IconWrapper>
  )
}

const Option = (props) => {

  const { children, buttonType, submitted, small, medium, large, extraLarge } = props;

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
      { submitted ? _renderSubmitIcon({...props, config: config}) : <div/>}
    </OptionWrapper>
  )

};

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

export default Option;
