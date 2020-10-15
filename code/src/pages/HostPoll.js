import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import HostPollCard         from '../components/cards/HostPollCard';

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const HostPollPage = ( props ) => {

  const poll = 'Ammend Clause XYZ';

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <HostPollCard pollTitle={poll} />
      </ComponentWrapper>
    </PageWrapper>
  );

}

export default HostPollPage;
