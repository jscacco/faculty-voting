import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import UserPollCard         from '../components/cards/UserPollCard';

import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  position: fixed;
  overflow: auto;
  height: 100vh;
`;

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const UserPollPage = ( props ) => {

  const poll = 'Ammend Clause XYZ';

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <UserPollCard pollTitle={poll} />
      </ComponentWrapper>
    </PageWrapper>
  );

}

export default UserPollPage;
