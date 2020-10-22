import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';

import HostDashCard        from '../components/cards/HostDashCard';

import history            from '../history';
import { fetchHostRooms } from '../store/MockDataFunctions';
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

const PageWrapper = styled.div`
  /* background-color: ${Colors.White}; */
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

const HostDashPage = ( props ) => {
  useEffect(() =>  {
    props.onFetchRooms();
  }, [])

  //
  // const open = props.openRooms.map(room => props.rooms[room]);
  // const closed = props.closedRooms.map(room => props.rooms[room]);
  // const pending = props.pendingRooms.map(room => props.rooms[room]);

  const onViewClick = ( room_id ) => {
    history.push(`/HostAgenda/${room_id}`)
  }

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <HostDashCard medium rooms={props.rooms}
                      order={props.order}
                      onDelete={props.onDeleteRoom}
                      onAdd={props.onAddRoom}
                      onViewClick={onViewClick}/>
      </ComponentWrapper>
    </PageWrapper>
  );

}


const mapStateToProps = (state) => {

  return {
    rooms: state.hostdash.rooms,
    order: state.hostdash.order,
    loading: state.hostdash.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchRooms: () => dispatch({ type: ActionTypes.hostdash.FETCH_ROOMS_START }),
    onDeleteRoom: (room_id) => dispatch({ type: ActionTypes.hostdash.DELETE_ROOM_START,
                                          room_id }),
    onAddRoom: () => dispatch({ type: ActionTypes.hostdash.ADD_ROOM_START }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostDashPage);

// export default HostDashPage;
