import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';

const propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
  extraLarge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  backgroundColor: undefined,
  borderColor: Colors.White,
  onClick: undefined

};

const BubbleComponent = styled.button`
  background: ${({backgroundColor}) => backgroundColor || `none`};
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: solid ${({border}) => border};
  border-color: ${({borderColor}) => borderColor};
  border-radius: 50%;
  height: ${({height}) => height};
  width: ${({width}) => width};
`;

const Bubble = (props) => {
  const { backgroundColor, borderColor,
         extraLarge, large, medium, small } = props;

  const bubbleConfig = {
    extraLarge: { height: `25px`,
                  width: `25px`,
                  border: `2px`},
    large: { height: `20px`,
              width: `20px`,
              border: `2px`},
    medium: { height: `16px`,
              width: `16px`,
              border: `1px`},
    small: { height: `14px`,
             width: `14px`,
             border: `1px`}
  };

  let config;

  if (extraLarge) { config = bubbleConfig.extraLarge }
  else if (large) { config = bubbleConfig.large }
  else if (small) { config = bubbleConfig.small }
  else { config = bubbleConfig.medium }

  console.log(config.bubbleSize)

  return(
    <BubbleComponent height={config.height}
                     width={config.width}
                     border={config.border}
                     backgroundColor={backgroundColor}
                     borderColor={borderColor}/>
  )
};

Bubble.propTypes = propTypes;
Bubble.defaultProps = defaultProps;

export default Bubble;
