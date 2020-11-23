import React                from 'react';
import styled               from 'styled-components';
import PropTypes            from 'prop-types';

import { Colors }           from '../theme/Colors';
import Jumbo                from '../theme/Jumbo';
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

const SectionWrapper = styled.div`
  ${({lastChild}) => !lastChild && `padding-bottom: 15px;`}
`;

const HeaderWrapper = styled.div`
  padding-bottom: 5px;
`;

const PolicySection = ( props ) => {

  const { section, lastChild, ...rest} = props;

  console.log(section)

  return (
    <SectionWrapper lastChild={lastChild}>
      <HeaderWrapper>
        <Jumbo sixExtraSmall={props.extraSmall}
               fiveExtraSmall={props.small}
               fourExtraSmall={props.medium}
               threeExtraSmall={props.large}
               twoExtraSmall={props.extraLarge}
               color={Colors.Black}>
          {section.header}
        </Jumbo>
      </HeaderWrapper>
      <Body {...rest}>
        {section.content}
      </Body>
    </SectionWrapper>
  )
}

const PolicyContent = ( props ) => {

  const { policyContent, ...rest } = props;

  return policyContent.map((item, index) => {
    const lastChild = index === policyContent.length - 1;

    return (
      <PolicySection section={item} lastChild={lastChild} {...rest}/>
    )
  })
}

const PrivacyPolicyCard = ( props ) => {

  const { policyContent, ...rest} = props;

  return (
    <SecondaryCard header={'Privacy Policy'}
                   headerColor={Colors.Blue}
                   cardColor={Colors.White}
                   width={`100%`}
                   {...rest}>
        <PolicyContent {...props}/>
    </SecondaryCard>
  )
}

PrivacyPolicyCard.propTypes = propTypes;
PrivacyPolicyCard.defaultProps = defaultProps;

export default PrivacyPolicyCard;
