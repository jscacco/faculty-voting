import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import LoginCard            from '../components/cards/LoginCard';

import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

import userLogin from '../LoginUtils.js';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

const CenterWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


const LoginWrapper = styled.div`
  width: 50%;
`;


const LoginPage = ( props ) => {

  return (
    <PageWrapper>
      <DemoNavBar />
      <CenterWrapper>
        <LoginWrapper>
          <LoginCard onUserLogin={userLogin}
                     onHostLogin={() => console.log('Host Login')}/>
        </LoginWrapper>
      </CenterWrapper>
    </PageWrapper>
  )
};

export default LoginPage;
