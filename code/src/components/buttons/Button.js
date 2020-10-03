import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,

  backgroundColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color,

  extraLarge: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  small: PropTypes.bool,
  extraSmall: PropTypes.bool
};

const defaultProps = {
  onClick: undefined,
  backgroundColor: Colors.Blue,
  textColor: Colors.White,
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
  cursor: ${({disabled}) => disabled ? `default` : `pointer`};
  outline: none;
  border: 0px;
  vertical-align: middle;
  horizontal-align: middle;
  text-decoration: none;
  border-radius: 42px;
  height: ${({buttonHeight}) => buttonHeight};
  width: 100%;
  padding-right: ${({padding}) => padding};
  padding-left: ${({padding}) => padding};
`;

const buttonConfig = {
  extraLarge: { buttonHeight: `44px`,
                padding: `28px` },
  large: { buttonHeight: `40px`,
           padding: `22px`},
  medium: { buttonHeight: `34px`,
            padding: `16px` },
  small: { buttonHeight: `28px`,
           padding: `14px`},
  extraSmall: { buttonHeight: `24px`,
           padding: `12px`},
};

const Button = ( props ) => {

  const { children, backgroundColor,textColor, onClick, ...rest} = props;

  let config;

  if (props.extraLarge) { config = buttonConfig.extraLarge }
  else if (props.large) { config = buttonConfig.large }
  else if (props.small) { config = buttonConfig.small }
  else if (props.extraSmall) { config = buttonConfig.extraSmall }
  else { config = buttonConfig.medium }

  return(
    <ButtonComponent padding={config.padding}
                     buttonHeight={config.buttonHeight}
                     {...props}>
      <BodyText color={textColor} children={children} {...rest}/>
    </ButtonComponent>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
