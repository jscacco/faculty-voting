import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

const propTypes = {
  color: ExtraPropTypes.color,

  height: PropTypes.int,
  width: PropTypes.int,
  padding: PropTypes.int,
  borderRadius: PropTypes.int,

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
  height: ${({height}) => height ?`${height}px` : `auto`};
  width: ${({width}) => width ? `${width}px` : `auto`};
  padding: ${({padding}) => padding}px;
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
