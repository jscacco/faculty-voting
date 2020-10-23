import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import { Colors }           from '../components/theme/Colors';

import HostDashCard        from '../components/cards/HostDashCard';

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

  console.log(props)

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <HostDashCard medium
                      onViewClick={(roomcode) => history.push(`/HostAgenda/${roomcode}`)}
                      rooms={props.rooms}
                      order={props.order}
                      onDelete={props.onDeleteRoom}
                      onAdd={props.onAddRoom}/>
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
