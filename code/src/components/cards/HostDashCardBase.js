import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Card             from './Card'
import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import StatusText       from '../format-text/StatusText'

const propTypes = {
  header: PropTypes.string,
  pollComponents: PropTypes.node,
  footer: PropTypes.node,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps ={
  header: 'Agenda',
};

const ComponentWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const PollSectionWrapper = styled.div`
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
  padding-bottom: ${({padding}) => padding}px;
`;

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

const AgendaCardBase = ( props ) => {

  const { header, openComponents, pendingComponents,
          closedComponents, footer, ...rest } = props;

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
      <Jumbo twoExtraSmall={props.extraSmall} extraSmall={props.small}
             small={props.medium} medium={props.large} large={props.extraLarge}
             color={Colors.White}>
        {header}
      </Jumbo>
    </HeaderWrapper>
  );

  const _renderPollSection = ( components, status ) => (
    <PollSectionWrapper padding={padding}>
      <HeaderWrapper padding={subPadding}>
        <StatusText fiveExtraSmall={props.extraSmall} fourExtraSmall={props.small}
                    threeExtraSmall={props.medium} twoExtraSmall={props.large} extraSmall={props.extraLarge}
                    status={status} jumbo color={Colors.White} />
      </HeaderWrapper>
      {React.cloneElement(components, {...rest})}
    </PollSectionWrapper>
  );

  // const _renderPollSection = (
  //     <ScrollableWrapper>
  //       {React.cloneElement(openComponents, {...rest})}
  //     </ScrollableWrapper>
  // )

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
          {_renderPollSection(openComponents, 'open')}
          {_renderPollSection(pendingComponents, 'pending')}
          {_renderPollSection(closedComponents, 'closed')}
        </ScrollableWrapper>
        {_renderFooter}
      </InnerWrapper>
    </Card>
  )
};

AgendaCardBase.propTypes = propTypes;
AgendaCardBase.defaultProps = defaultProps;

export default AgendaCardBase;
