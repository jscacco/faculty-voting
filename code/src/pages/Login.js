import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';
import history              from '../history';

import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';
import { Colors }           from '../components/theme/Colors';

import LoginCard            from '../components/cards/LoginCard';

const LoginWrapper = styled.div`
  width: ${({width}) => width};
`;

const LoginComponent = ( props ) => {

  let width;
  let size = {};
  switch (props.viewport) {
    case 'smallDesktop':
      width = `75%`;
      size.small = true;
      break;
    case 'tablet':
      width = `100%`;
      size.small = true;
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
    <LoginWrapper width={width}>
      <LoginCard onUserLogin={props.onUserLogin}
                 onHostLogin={props.onHostLogin}
                 viewport={props.viewport}
                 {...size}/>
    </LoginWrapper>
  )
}

const LoginPage = ( props ) => {

  if (props.error) {
    props.onLogout();
    alert("Please log in with a Hamilton account. (And enable pop-ups if you don't see the login window appear)");
  }

  if (props.loginType === 'host') {
    history.push('/HostDash');
  }
  else if (props.loginType === 'user') {
    history.push('/Roomcode')
  }

  return (
    <ViewportHandler>
      <MainPage color={Colors.Blue}>
          <LoginComponent {...props}/>
      </MainPage>
    </ViewportHandler>
  )
};

const mapStateToProps = (state) => {

  return {
    loginType: state.login.loginType,
    loading: state.login.loading,
    error: state.login.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHostLogin: () => dispatch({ type: ActionTypes.login.HOST_LOGIN_START }),
    onUserLogin: () => dispatch({ type: ActionTypes.login.USER_LOGIN_START }),
    onLogout: () => dispatch({ type: ActionTypes.login.LOGOUT_START }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
