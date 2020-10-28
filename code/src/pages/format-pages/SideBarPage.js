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
  color: Colors.LightBlue
};

const HeaderWrapper = styled.div`
  padding-bottom: 20px;
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  width: 90%;
  height: 80%;
`;

const MainCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

const SideComponentWrapper = styled.div `
  ${({lastChild}) => !lastChild ? `padding-bottom: 10px` : ``}
`;

const SideBarWrapper = styled.div`
  width: 40%;
  padding-left: 10px;
`;

const SideBar = ( props ) => {

  const { sideContent } = props;

  return (
    <SideBarWrapper>
      {sideContent.map((comp, index) => {
        const lastChild = index === sideContent.length;

        return (
          <SideComponentWrapper lastChild={lastChild}>
            {comp}
          </SideComponentWrapper>
        )
      })}
    </SideBarWrapper>
  )
}


const SideBarPage = ( props ) => {

  const mainComponent = props.sideContent ?
    <>
      {props.children}
      <SideBar sideContent={props.sideContent}/>
    </> : props.children

  return (
    <BasePage color={props.color}>
      <HeaderWrapper>
        {props.header}
      </HeaderWrapper>
      <ComponentWrapper>
        {mainComponent}
      </ComponentWrapper>
    </BasePage>
  )
}

SideBarPage.propTypes = propTypes;
SideBarPage.defaultProps = defaultProps;

export default SideBarPage;
