import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import EditPollCard         from '../components/cards/EditPollCard';

import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

const PageWrapper = styled.div`
  background-color: ${Colors.White};
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

const EditPollPage = ( props ) => {

  const poll = 'Ammend Clause XYZ';

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <EditPollCard pollTitle={poll} />
      </ComponentWrapper>
    </PageWrapper>
  );

}

export default EditPollPage;