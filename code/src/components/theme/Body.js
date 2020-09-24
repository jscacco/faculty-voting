import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Text             from './Text'
import { Fonts }        from './Fonts';
import { Colors }       from './Colors';

const propTypes = {
  children: PropTypes.node.isRequired,
  primative: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h6', 'span', 'p']),

  color: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  primitive: 'p',

  color: Colors.Black,
};

const fontConfig = {
  fontFamily: Fonts.WorkSans,
  fontWeight: 'bold',

  extraSmall: { fontSize: 14, lineHeight: 20  },
  small: { fontSize: 16, lineHeight: 22 },
  medium: { fontSize: 20, lineHeight: 28  },
  large: { fontSize: 26, lineHeight: 36 },
  extraLarge: { fontSize: 32, lineHeight: 42 }
};

const BodyWrapper = styled(Text)`
  font-weight: ${fontConfig.fontWeight};
  font-family: ${fontConfig.fontFamily};
  color: ${({color}) => color};
  white-space: pre-line;
`;

const Body = ( props ) => {

  const { primitive, extraLarge, large, medium, small, extraSmall,
          children, color, ...rest } = props;

  let sizeConfig = {};
  if (extraLarge) { sizeConfig = fontConfig.extraLarge }
  else if (large) { sizeConfig = fontConfig.large }
  else if (small) { sizeConfig = fontConfig.small }
  else if (extraSmall) { sizeConfig = fontConfig.extraSmall }
  else { sizeConfig = fontConfig.medium }

  return(
    <BodyWrapper color={color}
                 primitive={primitive}
                 fontSize={sizeConfig.fontSize}
                 lineHeight={sizeConfig.lineHeight}
                 {...rest}>
      {children}
    </BodyWrapper>
  );
};

Body.propTypes = propTypes;
Body.defaultProps = defaultProps;

export default Body;
