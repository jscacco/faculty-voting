import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostDashCard        from '../components/cards/HostDashCard';

import { fetchHostRooms } from '../store/MockDataFunctions';
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
`;

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const HostDashPage = ( props ) => {
  const rooms = fetchHostRooms();

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <HostDashCard medium openRooms={rooms.openRooms} pendingRooms={rooms.pendingRooms}
                      closedRooms={rooms.closedRooms}/>
      </ComponentWrapper>
    </PageWrapper>
  );

}

export default HostDashPage;
