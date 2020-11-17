import React                from 'react';
import styled               from 'styled-components';
import PropTypes            from 'prop-types';
import ExtraPropTypes       from 'react-extra-prop-types';

import { Colors }           from '../theme/Colors';
import Jumbo                from '../theme/Jumbo';

import Card                 from './Card';

const propTypes = {
  cardColor: ExtraPropTypes.color,
  cardBorderColor: ExtraPropTypes.color,
  height: PropTypes.string,
  textColor: PropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

const defaultProps = {
  textColor: Colors.Blue
}

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


const LoginCard = ( props ) => {

  const { cardColor, cardBorderColor, height,
          textColor,
          extraSmall, small, medium, large, ...rest } = props;

  return (
    <Card color={props.cardColor}
          height={props.extraSmall ? `100%` : `stretch`} width={`100%`}
          borderLarge borderColor={props.cardBorderColor}
          {...{extraSmall, small, medium, large}}
          {...rest}>
      <CenterWrapper>
        <Jumbo color={textColor}
               threeExtraSmall={extraSmall} extraSmall={small}
               small={medium} medium={large} large={props.extraLarge}>
          Loading...
        </Jumbo>
      </CenterWrapper>
    </Card>
  )
};

LoginCard.propTypes = propTypes;
LoginCard.defaultProps = defaultProps;

export default LoginCard;
