import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Card             from '../cards/Card'
import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import StatusText       from '../format-text/StatusText'

const propTypes = {
  header: PropTypes.string,
  headerButton: PropTypes.node,
  sections: PropTypes.arrayOf(PropTypes.object),
  footer: PropTypes.node,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps ={
  header: 'Card',
  sections: [],
};

const ComponentWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const SectionWrapper = styled.div`
  padding-bottom: ${({padding}) => padding}px;
`;

const InnerWrapper = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${({padding}) => padding}px;
`;

const HeaderTextWrapper = styled.div`
  width: 100%
`;

const HeaderButtonWrapper  = styled.div``;

const ScrollableWrapper = styled.div`
  overflow: scroll;
  height: 100%;
  width: 100%;
`;

const FooterWrapper = styled.div`
  padding-top: ${({padding}) => padding}px;
  display: flex;
  justify-content: center;
`;

const SecondaryCard = ( props ) => {

  const { header, headerButton, sections, footer, ...rest } = props;

  let padding;
  let subPadding;
  if (props.extraSmall) { padding = 40;
                          subPadding = 14}
  else if (props.small) { padding = 45;
                          subPadding = 16}
  else if (props.large) { padding = 55;
                          subPadding = 28}
  else if (props.extraLarge) { padding = 60;
                              subPadding = 32}
  else { padding = 50;
         subPadding = 22}

 const _renderHeader = (
   <HeaderWrapper padding={padding}>
     <HeaderTextWrapper>
       <Jumbo twoExtraSmall={props.extraSmall} extraSmall={props.small}
              small={props.medium} medium={props.large} large={props.extraLarge}
              color={Colors.White}>
         {header}
       </Jumbo>
     </HeaderTextWrapper>
     <HeaderButtonWrapper>
       {headerButton ? React.cloneElement(headerButton, {...rest}) :
                     <div/>}
     </HeaderButtonWrapper>
   </HeaderWrapper>
 );

  const _renderSection = ( section ) => {

    return (
    <SectionWrapper padding={padding}>
      <HeaderWrapper padding={subPadding}>
        {section.header}
      </HeaderWrapper>
      {React.cloneElement(section.content, {...rest})}
    </SectionWrapper>
  );}


  const _renderFooter =  footer ? (
    <FooterWrapper padding={padding}>
      {React.cloneElement(footer, {...rest})}
    </FooterWrapper>
  ) : <div/>;

  return (
    <Card color={Colors.LightBlue} height={'100%'} large borderColor={Colors.White}>
      <InnerWrapper>
        {_renderHeader}
        <ScrollableWrapper>
          {sections.map((section) => _renderSection(section))}
        </ScrollableWrapper>
        {_renderFooter}
      </InnerWrapper>
    </Card>
  )
};

SecondaryCard.propTypes = propTypes;
SecondaryCard.defaultProps = defaultProps;

export default SecondaryCard;