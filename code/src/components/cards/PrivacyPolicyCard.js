import React                from 'react';
import PropTypes            from 'prop-types';

import { Colors }           from '../theme/Colors';
import Body                 from '../theme/Body';

import SecondaryCard        from '../format-cards/SecondaryCard';


const propTypes = {
  children: PropTypes.node,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

const defaultProps = {

}


const PrivacyPolicyCard = ( props ) => {

  const { children, ...rest} = props;


  return (
    <SecondaryCard header={'Privacy Policy'}
                   headerColor={Colors.Blue}
                   cardColor={Colors.White}
                   width={`100%`}
                   {...rest}>
        <Body>
          {children}
        </Body>
    </SecondaryCard>
  )
}

PrivacyPolicyCard.propTypes = propTypes;
PrivacyPolicyCard.defaultProps = defaultProps;

export default PrivacyPolicyCard;
