import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';
import { Colors }           from '../components/theme/Colors';

import Jumbo          from '../components/theme/Jumbo';


const LoginWrapper = styled.div`
  width: ${({width}) => width};
`;
//
// const LoginComponent = ( props ) => {
//
//   let width;
//   let size = {};
//   switch (props.viewport) {
//     case 'smallDesktop':
//       width = `75%`;
//       size.small = true;
//       break;
//     case 'tablet':
//       width = `100%`;
//       size.small = true;
//       break;
//     case 'mobile':
//     case 'smallMobile':
//       width = `100%`
//       size.extraSmall = true;
//       break;
//     case 'hdDesktop':
//     case 'uhdDesktop':
//       width = `50%`
//       size.medium = true;
//       break;
//     default:
//       width = `50%`
//       size.small = true;
//   }

const LoginPage = ( props ) => {

  console.log(props)

  return (
    <ViewportHandler>
      <MainPage color={Colors.LightBlue}>
          <Jumbo color={Colors.White}>
            Loading...
          </Jumbo>
      </MainPage>
    </ViewportHandler>
  )
};

export default LoginPage;
