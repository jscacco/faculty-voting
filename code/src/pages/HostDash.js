import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostDashCard        from '../components/cards/HostDashCard';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const HostDashPage = ( props ) => {

  const openRoom = { roomTitle: 'Room', status:'open' , roomCode:'123'}
  const pendingRoom = { roomTitle: 'Room', status:'pending' , roomCode:'1234'}
  const closedRoom = { roomTitle: 'Room', status:'closed' , roomCode:'123'}

  const openRooms=[openRoom,openRoom,openRoom]
  const closedRooms = [closedRoom]
  const pendingRooms = [pendingRoom,pendingRoom,pendingRoom,pendingRoom,pendingRoom]

  return (
    <ComponentWrapper>
      <HostDashCard medium openRooms={openRooms} pendingRooms={pendingRooms}
                    closedRooms={closedRooms}/>
    </ComponentWrapper>
  );

}

export default HostDashPage;
