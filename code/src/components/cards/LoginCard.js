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
  min-width: 250px;
`;

const HostWrapper = styled.div`
  display: inline-block
`;

const LoginCard = ( props ) => {

  const { onHostLogin, onUserLogin,
          extraSmall, small, medium, large } = props;

  console.log(props)

  let padding;

  if ( extraSmall ) { padding = 20 }
  else if ( small ) { padding = 25 }
  else if ( large ) { padding = 35 }
  else { padding = 30 }

  const _renderLogin = (
    <CenterRowWrapper padding={padding}>
      <LoginWrapper>
        <Button jumbo
                extraSmall={extraSmall} small={small}
                medium={medium} large={large}
                backgroundColor={Colors.Green}
                onClick={onUserLogin}>
          LOGIN
        </Button>
      </LoginWrapper>
    </CenterRowWrapper>
  );

  const _renderHostLogin = (
    <CenterRowWrapper>
      <HostWrapper>
        <Button large
                twoExtraSmall={extraSmall} extraSmall={small}
                small={medium} medium={large}
                onClick={onHostLogin}>
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
