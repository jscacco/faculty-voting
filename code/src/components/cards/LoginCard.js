import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../theme/Colors';
import Button                from '../buttons/Button';

import Card                 from './Card';

const CenterRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({padding}) => padding ? `padding-bottom: ${padding}px;` : ``}
`;

const LoginWrapper = styled.div`
  width: 75%;
`;

const HostWrapper = styled.div`
  display: inline-block
`;

const LoginCard = ( props ) => {

  const { onHostLogin, onUserLogin } = props;

  const _renderLogin = (
    <CenterRowWrapper padding={30}>
      <LoginWrapper>
        <Button jumbo medium backgroundColor={Colors.Green}
                onClick={onUserLogin}>
          LOGIN
        </Button>
      </LoginWrapper>
    </CenterRowWrapper>
  );

  const _renderHostLogin = (
    <CenterRowWrapper>
      <HostWrapper>
        <Button large onClick={onHostLogin}>
          LOGIN AS HOST
        </Button>
      </HostWrapper>
    </CenterRowWrapper>
  );

  return (
    <Card>
      {_renderLogin}
      {_renderHostLogin}
    </Card>
  )
};

export default LoginCard;
