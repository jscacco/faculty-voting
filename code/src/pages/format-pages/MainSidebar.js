import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

// import { Colors }       from '../theme/Colors';
// import Jumbo            from '../theme/Jumbo';
// import Body             from '../theme/Body';

// import Card             from './Card';
// import TextOption       from '../options/TextOption';
// import OptionGroup      from '../option-group/OptionGroup';

const PageWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

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

const SideBarWrapper = styled.div`
  width: 40%;
  padding-left: 10px;
`;


const MainSideBar = ( props ) => {

  const mainComponent = props.sideContent ?
    <ComponentWrapper>
      {props.children}
      <SideBarWrapper>
        {props.sideContent}
      </SideBarWrapper>
    </ComponentWrapper> :
    <ComponentWrapper>
      {props.children}
    </ComponentWrapper>

  return (
    <PageWrapper>
      <HeaderWrapper>
        {props.header}
      </HeaderWrapper>
      {mainComponent}
    </PageWrapper>
  )
}

export default MainSideBar;
