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

  overflowHidden: PropTypes.bool,
  bottomBorder: PropTypes.bool,
  borderColor: ExtraPropTypes.color,

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

  twoExtraSmall: { fontSize: 12, lineHeight: 18  },
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

  ${({bottomBorder, borderColor}) => bottomBorder ?
    `border-bottom: 2px solid ${borderColor};
     cursor: pointer` : ``}

  ${({overflowHidden}) => overflowHidden ?
    `display: block;
     max-width: 100%;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;` : ``}
`;

const Body = ( props ) => {

  const { primitive, extraLarge, large, medium, small, extraSmall, twoExtraSmall,
          children, color, ...rest } = props;

  let sizeConfig = {};
  if (extraLarge) { sizeConfig = fontConfig.extraLarge }
  else if (large) { sizeConfig = fontConfig.large }
  else if (small) { sizeConfig = fontConfig.small }
  else if (extraSmall) { sizeConfig = fontConfig.extraSmall }
  else if (twoExtraSmall) { sizeConfig = fontConfig.twoExtraSmall }
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
