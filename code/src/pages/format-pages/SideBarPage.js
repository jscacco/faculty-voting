import React            from 'react';
import styled           from 'styled-components';

import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../../components/theme/Colors';
import BasePage         from './BasePage';

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  sideContent: PropTypes.node,

  color: ExtraPropTypes.color,
};

const defaultProps = {
  color: Colors.Blue
};

const HeaderWrapper = styled.div`
  padding-bottom: 20px;
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
  margin: ${({roomcode}) => roomcode ? `2vh 5vw 5vh 5vw` : `5vh 5vw`};
  /* height: 80%; */
`;

const SideBarWrapper = styled.div`
  width: 40%;
  min-width: 125px;
  padding-left: 10px;
`;

const HorizontalSideBarWrapper = styled.div`
  padding-bottom: 10px;

`;

const VerticalComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  margin: ${({roomcode}) => roomcode ? `2vh 5vw 5vh 5vw` : `5vh 5vw`};
  /* height: 80%; */
`;

const MainComponentWrapper = styled.div`
  height: 100%;
`;

const VerticalPage = ( props ) => {

  const mainComponent = props.sideContent ?
    <>
      <HorizontalSideBarWrapper>
        {React.cloneElement(props.sideContent, { viewport: props.viewport })}
      </HorizontalSideBarWrapper>
      <MainComponentWrapper>
        {React.cloneElement(props.children, { viewport: props.viewport })}
      </MainComponentWrapper>
    </> :
    <MainComponentWrapper>
      {React.cloneElement(props.children, { viewport: props.viewport })}
    </MainComponentWrapper>

  const headerComponent = props.header ?
    <HeaderWrapper>
      {React.cloneElement(props.header, { viewport: props.viewport })}
    </HeaderWrapper> :
    <></>

  return (
    <>
      {headerComponent}
      <VerticalComponentWrapper roomcode={props.roomcode} policy={props.policy}>
        {mainComponent}
      </VerticalComponentWrapper>
    </>
  )
}

const HorizontalPage = ( props ) => {

  const mainComponent = props.sideContent ?
    <>
      {React.cloneElement(props.children, { viewport: props.viewport })}
      <SideBarWrapper>
        {React.cloneElement(props.sideContent, { viewport: props.viewport })}
      </SideBarWrapper>
    </> : React.cloneElement(props.children, { viewport: props.viewport })

  const headerComponent = props.header ?
    <HeaderWrapper>
      {React.cloneElement(props.header, { viewport: props.viewport })}
    </HeaderWrapper> :
    <></>

  return (
    <>
      {headerComponent}
      <ComponentWrapper roomcode={props.roomcode} policy={props.policy}>
        {mainComponent}
      </ComponentWrapper>
    </>
  )
}


const SideBarPage = ( props ) => {

  const small = props.viewport === 'mobile' || props.viewport === 'smallMobile';

  return (
    <BasePage color={props.color} viewport={props.viewport} roomcode={props.roomcode} policy={props.policy}>
      {small ? <VerticalPage {...props}/> : <HorizontalPage {...props}/>}
    </BasePage>
  )
}

SideBarPage.propTypes = propTypes;
SideBarPage.defaultProps = defaultProps;

export default SideBarPage;
