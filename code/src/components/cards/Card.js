import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

const propTypes = {
  color: ExtraPropTypes.color,

  height: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.number,
  borderRadius: PropTypes.number,
  borderColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
}

const defaultProps = {
  color: Colors.White,
  borderColor: Colors.White
}

const CardComponent = styled.div`
  box-sizing: border-box;
  background-color: ${({color}) => color};
  border-radius: ${({borderRadius}) => borderRadius}px;
  ${({height}) => height ?`height: ${height}` : `height: auto`};
  width: ${({width}) => width ? `${width}` : `auto`};
  padding: ${({padding}) => padding}px;
  /* padding: 5vw; */
  ${({borderColor, borderWidth}) => borderColor ? `border: ${borderWidth}px solid ${borderColor}` : ``};
`;

const paddingConfig = {
  extraSmall: {
    small: 8,
    medium: 10,
    large: 20,
  },
  small: {
    small: 10,
    medium: 12,
    large: 25,
  },
  medium: {
    small: 15,
    medium: 25,
    large: 35,
  },
  large: {
    small: 20,
    medium: 42,
    large: 50,
  }
}

const getPadding = (size, borderSmall, borderMedium, borderLarge) => {

  if (borderSmall) { return paddingConfig[size].small}
  else if (borderLarge) { return paddingConfig[size].large}
  else { return paddingConfig[size].medium}
}

const Card = ( props ) => {

  const { children, borderSmall, borderMedium, borderLarge,
          extraSmall, small, medium, large, ...rest } = props;

  let borderRadius;
  if ( borderSmall ) { borderRadius = 5 }
  else if ( borderLarge ) { borderRadius = 20 }
  else { borderRadius = 15 }

  let padding;
  let borderWidth;
  if ( extraSmall ) { padding = getPadding('extraSmall', borderSmall, borderMedium, borderLarge); borderWidth = 3 }
  else if ( small ) { padding = getPadding('small', borderSmall, borderMedium, borderLarge); borderWidth = 3 }
  else if ( large ) { padding = getPadding('large', borderSmall, borderMedium, borderLarge); borderWidth = 5 }
  else { padding = getPadding('medium', borderSmall, borderMedium, borderLarge); borderWidth = 5 }

  return (
    <CardComponent borderRadius={borderRadius}
                   borderWidth={borderWidth}
                   padding={padding}
                   {...rest}>
      {children}
    </CardComponent>
  )
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
