import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Card             from '../cards/Card'
import { Colors }       from '../theme/Colors';

const propTypes = {
  header: PropTypes.string,
  headerButton: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,

  cardColor: ExtraPropTypes.color,
  cardBorderColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};


const defaultProps ={
  cardColor: Colors.Blue,
  cardBorderColor: Colors.White,
};


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
  padding-right: 15px;
  height: 100%;
  width: 100%;
`;

const FooterWrapper = styled.div`
  padding-top: ${({padding}) => padding}px;
  display: flex;
  justify-content: center;
`;

const SecondaryCard = ( props ) => {

  const { header, headerButton, children, footer,
          cardColor, cardBorderColor, ...rest } = props;

  let padding;
  if (props.extraSmall) { padding = 40; }
  else if (props.small) { padding = 45; }
  else if (props.large) { padding = 55; }
  else if (props.extraLarge) { padding = 60; }
  else { padding = 50; }

 const _renderHeader = (
   <HeaderWrapper padding={padding}>
     <HeaderTextWrapper>
       {header}
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
      {React.cloneElement(section, {...rest})}
    </SectionWrapper>
  );}


  const _renderFooter =  footer ? (
    <FooterWrapper padding={padding}>
      {React.cloneElement(footer, {...rest})}
    </FooterWrapper>
  ) : <div/>;


  return (
    <Card color={cardColor} height={props.height || 'stretch'} width={props.width}
          borderLarge borderColor={cardBorderColor}
          {...rest}>
      <InnerWrapper>
        {_renderHeader}
        <ScrollableWrapper>
          {React.Children.map(props.children, (child) => _renderSection(child))}
        </ScrollableWrapper>
        {_renderFooter}
      </InnerWrapper>
    </Card>
  )
};

SecondaryCard.propTypes = propTypes;
SecondaryCard.defaultProps = defaultProps;

export default SecondaryCard;
