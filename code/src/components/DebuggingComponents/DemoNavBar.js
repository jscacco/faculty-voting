import React                from 'react';
import styled               from 'styled-components';

import history              from '../../history';

import Button               from '../buttons/Button';

const ComponentWrapper = styled.div`
  display: flex;
  direction: row;
`;

const ButtonWrapper = styled.div`
  padding: 15px;
`;

const DemoNavBar = ( props ) => {

  const pages = [
    'Login',
    'HostDash',
    'HostAgenda',
    'UserAgenda',
    'HostPoll',
    'UserPoll',
  ]

  const goTo = (pageName) => {
    console.log(pageName);
    history.push('/' + pageName);
  }

  const navButtons = pages.map(pageName => {
    return (
      <ButtonWrapper>
        <Button small onClick={() => {goTo(pageName)}}>
          {pageName}
        </Button>
      </ButtonWrapper>
    )
  })

  return (
    <ComponentWrapper>
      {navButtons}
    </ComponentWrapper>
  );

}

export default DemoNavBar;
