import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import MainPage             from './format-pages/BasePage';
import { Colors }           from '../components/theme/Colors';

import history              from '../history';

import LoginCard            from '../components/cards/LoginCard';


const LoginWrapper = styled.div`
  width: 50%;
`;

const LoginPage = ( props ) => {

  return (
    <MainPage color={Colors.LightBlue}>
        <LoginWrapper>
          <LoginCard onUserLogin={() => history.push('/Roomcode')}
                     onHostLogin={() => history.push('/HostDash')}/>
        </LoginWrapper>
    </MainPage>
  )
};

export default LoginPage;
