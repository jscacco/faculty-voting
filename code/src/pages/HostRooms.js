import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostRoomsCard        from '../components/cards/HostRoomsCard';

const HostRoomsPage = ( props ) => {

  const { pendingRooms, activeRooms, closedRooms, ...rest } = props;

  return (
    <HostRoomsCard type={'Room'} header={'My Rooms'}
                    pendingRooms={pendingRooms} activeRooms={activeRooms} closedRooms={closedRooms}
                    {...rest}/>
  )

}

export default HostRoomsPage;
