import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';

const propTypes = {
  children: PropTypes.node,
  width: PropTypes.int,
  backgroundColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  backgroundColor: Colors.Blue,
  textColor: Colors.White,
  onClick: undefined

};

const BodyText = styled(Body)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ButtonComponent = styled.button`
  background: ${({backgroundColor}) => backgroundColor};
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  horizontal-align: middle;
  text-decoration: none;
  border-radius: 42px;
  height: ${({buttonHeight}) => buttonHeight};
  padding-right: ${({padding}) => padding};
  padding-left: ${({padding}) => padding};
  ${({width}) => width ? `width: ${width}px;` : ``}
`;

const Button = (props) => {
  const { children, width, backgroundColor,
          textColor, extraLarge, large, medium, small } = props;

  const buttonConfig = {
    extraLarge: { buttonHeight: `58px`,
                  padding: `28px`,
                  text: (<BodyText extraLarge color={textColor}>
                           {children}
                         </BodyText>)
                },
    large: { buttonHeight: `48px`,
             padding: `22px`,
             text: (<BodyText large color={textColor}>
                      {children}
                    </BodyText>)
            },
    medium: { buttonHeight: `40px`,
              padding: `16px`,
             text: (<BodyText medium color={textColor}>
                      {children}
                    </BodyText>)
            },
    small: { buttonHeight: `32px`,
             padding: `14px`,
             text: (<BodyText small color={textColor}>
                      {children}
                    </BodyText>)
            },
  };

  let config;

  if (extraLarge) { config = buttonConfig.extraLarge }
  else if (large) { config = buttonConfig.large }
  else if (small) { config = buttonConfig.small }
  else { config = buttonConfig.medium }

  return(
    <ButtonComponent
                     padding={config.padding}
                     buttonHeight={config.buttonHeight}
                     {...props}>
      {config.text}
    </ButtonComponent>
  )
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
