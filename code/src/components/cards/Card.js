import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

const propTypes = {
  color: ExtraPropTypes.color,

  height: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.int,
  borderRadius: PropTypes.int,
  borderColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
}

const defaultProps = {
  color: Colors.White,
}

const CardComponent = styled.div`
  background-color: ${({color}) => color};
  border-radius: ${({borderRadius}) => borderRadius}px;
  ${({height}) => height ?`height: ${height}` : `height: auto`};
  width: ${({width}) => width ? `${width}` : `auto`};
  padding: ${({padding}) => padding}px;
  ${({borderColor}) => borderColor ? `border: 2px solid ${borderColor}` : ``};
`;

const sizeConfig = {
  small: {
    borderRadius: 5,
    padding: 10,
  },
  medium: {
    borderRadius: 15,
    padding: 25,
  },
  large: {
    borderRadius: 20,
    padding: 35
  }
}

const Card = ( props ) => {

  const { children, small, large, ...rest } = props;

  let size;
  if ( small ) { size = sizeConfig.small }
  else if ( large ) { size = sizeConfig.large }
  else { size = sizeConfig.large }

  return (
    <CardComponent borderRadius={size.borderRadius}
                   padding={size.padding}
                   {...rest}>
      {children}
    </CardComponent>
  )
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
