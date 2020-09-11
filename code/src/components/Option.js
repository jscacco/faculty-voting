import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import Bubble           from './Bubble';

const propTypes = {
  children: PropTypes.node,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  borderColor: Colors.Black,
  textColor: Colors.Black,
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

const Option = (props) => {

  const { children, backgroundColor, borderColor, textColor,
          small, medium, large, extraLarge } = props;

  const optionConfig = {
    small: { bubble: <Bubble backgroundColor={backgroundColor}
                             borderColor={borderColor} small/>,
             text: <Body color={textColor} small>
                      {children}
                   </Body>,
             padding: `10px`},
    medium: { bubble: <Bubble backgroundColor={backgroundColor}
                            borderColor={borderColor} medium/>,
              text: <Body color={textColor} medium>
                       {children}
                    </Body>,
              padding: `12px`},
    large: { bubble: <Bubble backgroundColor={backgroundColor}
                             borderColor={borderColor} large/>,
             text: <Body color={textColor} large>
                      {children}
                   </Body>,
             padding: `14px`},
    extraLarge: { bubble: <Bubble backgroundColor={backgroundColor}
                                borderColor={borderColor} extraLarge/>,
                  text: <Body color={textColor} extraLarge>
                           {children}
                        </Body>,
                  padding: `16px`},
  };

  let config;

  if (extraLarge) {config = optionConfig.extraLarge}
  else if (large) {config = optionConfig.large}
  else if (small) {config = optionConfig.small}
  else {config = optionConfig.medium}

  return (
    <OptionWrapper>
      <BubbleWrapper padding={config.padding}>
        {config.bubble}
      </BubbleWrapper>
      <TextWrapper>
        {config.text}
      </TextWrapper>
    </OptionWrapper>
  )

};

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

export default Option;
