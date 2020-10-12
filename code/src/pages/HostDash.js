import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostDashCard        from '../components/cards/HostDashCard';

import { fetchHostRooms } from '../store/MockDataFunctions';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const HostDashPage = ( props ) => {
  const rooms = fetchHostRooms();

  return (
    <ComponentWrapper>
      <HostDashCard medium openRooms={rooms.openRooms} pendingRooms={rooms.pendingRooms}
                    closedRooms={rooms.closedRooms}/>
    </ComponentWrapper>
  );

}

export default HostDashPage;
