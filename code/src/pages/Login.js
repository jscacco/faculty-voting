import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import LoginCard            from '../components/cards/LoginCard';

import userLogin            from '../databaseFunctionality/UserVerification';
import { hostLogin }        from '../databaseFunctionality/UserVerification';

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

/*async function userLog() {
  userLogin().then(result => {
    console.log(result);
  })
}

async function hostLog() {
  hostLogin().then(result => {
    console.log(result);
  })
}*/

const LoginPage = ( props ) => {

  return (
    <PageWrapper>
      <CenterWrapper>
        <LoginWrapper>
          <LoginCard onUserLogin={() => userLogin()}
                     onHostLogin={() => hostLogin()}/>
        </LoginWrapper>
      </CenterWrapper>
    </PageWrapper>
  )
};

export default LoginPage;
