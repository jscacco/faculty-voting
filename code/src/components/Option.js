import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import Bubble           from './Bubble';

const propTypes = {
  id: PropTypes.int,
  children: PropTypes.node,
  selected: PropTypes.bool,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color,
  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};

const defaultProps = {
  borderColor: Colors.Black,
  textColor: Colors.Black,
  backgroundColor: Colors.Black
};

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BubbleWrapper = styled.div`
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

const Option = (props) => {

  const { onClick, children, backgroundColor, borderColor, textColor, selected,
          small, medium, large, extraLarge } = props;

  let config;

  if (extraLarge) {config = optionConfig.extraLarge}
  else if (large) {config = optionConfig.large}
  else if (small) {config = optionConfig.small}
  else {config = optionConfig.medium}

  return (
    <OptionWrapper>
      <BubbleWrapper padding={config.padding}>
        <Bubble onClick={onClick} backgroundColor={backgroundColor} borderColor={borderColor} selected={selected}
                small={small} medium={medium} large={large} extraLarge={extraLarge}/>
      </BubbleWrapper>
      <TextWrapper>
        <Body color={textColor}
              small={small} medium={medium} large={large} extraLarge={extraLarge}>
             {children}
          </Body>
      </TextWrapper>
    </OptionWrapper>
  )

};

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

export default Option;
