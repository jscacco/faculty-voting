import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Text             from './Text'
import { Fonts }        from './Fonts';
import { Colors }       from './Colors';

const propTypes = {
  color: ExtraPropTypes.color,
  primative: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h6', 'span', 'p']),
  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  color: Colors.Black,
  primitive: 'p'
};

const fontConfig = {
  fontFamily: Fonts.WorkSans,
  fontWeight: 'bold',
  extraSmall: { fontSize: 12, lineHeight: 18 },
  small: { fontSize: 14, lineHeight: 20 },
  medium: { fontSize: 16, lineHeight: 22 },
  large: { fontSize: 20, lineHeight: 28 },
  extraLarge: { fontSize: 26, lineHeight: 36 }
};
const BodyWrapper = styled(Text)`
  font-weight: ${fontConfig.fontWeight};
  font-family: ${fontConfig.fontFamily};
  color: ${({color}) => color};
  white-space: pre-line;
`;

const Body = (props) => {
  const { primitive, extraLarge, large, medium, small, extraSmall,
          children, width, color, ...rest } = props;

  let sizeConfig = {};
  if (extraLarge) { sizeConfig = fontConfig.extraLarge }
  else if (large) { sizeConfig = fontConfig.large }
  else if (medium) { sizeConfig = fontConfig.medium }
  else if (small) { sizeConfig = fontConfig.small }
  else { sizeConfig = fontConfig.extraSmall }

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
