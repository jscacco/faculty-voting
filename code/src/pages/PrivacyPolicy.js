import React                from 'react';
import styled               from 'styled-components';

import history              from '../history';

import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';
import { Colors }           from '../components/theme/Colors';

import policy               from '../PrivacyPolicy.js';
import PrivacyPolicyCard    from '../components/cards/PrivacyPolicyCard';


const PolicyComponent = ( props ) => {

  let width;
  let size = {};
  switch (props.viewport) {
    case 'smallDesktop':
      width = `75%`;
      size.small = true;
      break;
    case 'tablet':
      width = `100%`;
      size.extraSmall = true;
      break;
    case 'mobile':
    case 'smallMobile':
      width = `100%`
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      width = `50%`
      size.medium = true;
      break;
    default:
      width = `50%`
      size.small = true;
  }

  return (
    <PrivacyPolicyCard  viewport={props.viewport}
                        {...size}>
      {policy}
    </PrivacyPolicyCard>
  )
}

const PrivacyPolicyPage = ( props ) => {

  return (
    <ViewportHandler>
      <MainPage color={Colors.Blue}>
          <PolicyComponent {...props}/>
      </MainPage>
    </ViewportHandler>
  )
};


export default PrivacyPolicyPage;
