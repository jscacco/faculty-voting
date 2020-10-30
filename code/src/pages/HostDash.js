import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import MainPage             from './format-pages/MainPage';
import { Colors }           from '../components/theme/Colors';

import HostDashCard        from '../components/cards/HostDashCard';

const HostDashPage = ( props ) => {
  useEffect(() =>  {
    props.onFetchRooms();
  }, [])

  console.log(props)

  const onViewClick = (roomcode, roomStatus) => {
    console.log(roomStatus)
    if (roomStatus === 'closed') {
      history.push(`/RoomResults/${roomcode}`)
    }
    else {
      history.push(`/HostAgenda/${roomcode}`)
    }
  }

  return (
    <MainPage>
        <HostDashCard medium
                      onViewClick={onViewClick}
                      rooms={props.rooms}
                      order={props.order}
                      onDelete={props.onDeleteRoom}
                      onAdd={props.onAddRoom}/>
    </MainPage>
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
