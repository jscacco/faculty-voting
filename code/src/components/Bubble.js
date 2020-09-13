import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';

const propTypes = {
  id: PropTypes.int,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
  extraLarge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

const defaultProps = {
  backgroundColor: Colors.Charcol,
  borderColor: Colors.White,
  onClick: undefined,

};

const BubbleWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const BubbleBackground = styled.div`
  position: absolute;
  top: ${({top}) => top};
  left: ${({left}) => left};
  background-color: ${({backgroundColor}) => backgroundColor};
  border-color: none;
  border-radius: 50%;
  height: ${({height}) => height};
  width: ${({width}) => width};
`;

const BubbleComponent = styled.button`
  background: none;
  position: relative;
  cursor: pointer;
  outline: none;
  border: solid ${({border}) => border};
  border-color: ${({borderColor}) => borderColor};
  border-radius: 50%;
  height: ${({height}) => height};
  width: ${({width}) => width};
`;

const bubbleConfig = {
  extraLarge: { height: `32px`,
                width: `32px`,
                border: `3px`,
                background: { height: `19px`,
                              width: `19px`,
                              top: `7px`,
                              left: `6px`
                            }
              },
  large: { height: `26px`,
          width: `26px`,
          border: `2px`,
          background: { height: `16px`,
                        width: `16px`,
                        top: `5px`,
                        left: `5px`
                      }
         },
  medium: { height: `20px`,
           width: `20px`,
           border: `2px`,
           background: { height: `12px`,
                         width: `12px`,
                         top: `4px`,
                         left: `4px`},
          },
  small: { height: `16px`,
            width: `16px`,
            border: `1px`,
            background: { height: `8px`,
                          width: `8px`,
                          top: `5px`,
                          left: `4px`}
         },
};

const renderSelected = (selected, backgroundConfig, backgroundColor) => {
  if (selected) {
    return (<BubbleBackground height={backgroundConfig.height}
                      backgroundColor={backgroundColor}
                      width={backgroundConfig.width}
                      top={backgroundConfig.top}
                      left={backgroundConfig.left}/>);}
}

const Bubble = (props) => {
  const { onClick, backgroundColor, borderColor, selected,
         extraLarge, large, medium, small } = props;

  let config;

  if (extraLarge) { config = bubbleConfig.extraLarge }
  else if (large) { config = bubbleConfig.large }
  else if (small) { config = bubbleConfig.small }
  else { config = bubbleConfig.medium }

  const backgroundConfig = config.background;

  return(
    <BubbleWrapper>
      {renderSelected(selected, backgroundConfig, backgroundColor)}
      <BubbleComponent height={config.height}
                       width={config.width}
                       border={config.border}
                       borderColor={borderColor}
                       onClick={onClick}>
      </BubbleComponent>
    </BubbleWrapper>
  )
};

Bubble.propTypes = propTypes;
Bubble.defaultProps = defaultProps;

export default Bubble;
