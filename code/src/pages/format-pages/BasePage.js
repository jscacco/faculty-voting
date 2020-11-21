import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import PageHeader       from '../../components/theme/PageHeader'
import PageFooter       from '../../components/theme/PageFooter'
import RoomcodeHeader   from '../../components/theme/RoomcodeHeader'

const propTypes = {
  children: PropTypes.node,
  color: ExtraPropTypes.color,
};

const defaultProps = {};

const PageWrapper = styled.div`
  background-color: ${({color}) => color};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: fixed;

  overflow: auto;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-between
`;

const HeaderWrapper = styled.div`
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 'stretch';
  /* padding-top: 5vh; */
  flex-grow: 2;
`;

const RoomcodeText = ( props ) => {

  let size = {};
  switch (props.viewport) {
    case 'mobile':
    case 'smallMobile':
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      size.medium = true;
      break;
    default:
      size.small = true;
  }

  return props.roomcode ?
    <RoomcodeHeader roomcode={props.roomcode}
                    {...size}/> :
    <></>
}

const BasePageWrapper = (props) => {

  return (
    <PageWrapper color={props.color}>
      <HeaderWrapper>
        <PageHeader />
        <RoomcodeText {...props}/>
      </HeaderWrapper>
      <CenterWrapper>
        {props.children}
      </CenterWrapper>
      <PageFooter />
    </PageWrapper>
  )
}

BasePageWrapper.propTypes = propTypes;
BasePageWrapper.defaultProps = defaultProps;

export default BasePageWrapper;
