import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';
import { Colors }           from '../components/theme/Colors';

import HostDashCard        from '../components/cards/HostDashCard';
import firebase            from '../databaseCommunication/permissions';

const DashComponent = ( props ) => {

  let size = {};
  switch (props.viewport) {
    case 'mobile':
    case 'smallMobile':
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      size.medium = true;
      break;
    default:
      size.small = true;
  }

  return (
    <HostDashCard {...size}
                  onViewClick={props.onViewClick}
                  rooms={props.rooms}
                  order={props.order}
                  onDelete={props.onDelete}
                  onAdd={props.onAdd}/>
  )
}

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
    <ViewportHandler>
      <MainPage>
          <DashComponent viewport={props.viewport}
                         onViewClick={onViewClick}
                         rooms={props.rooms}
                         order={props.order}
                         onDelete={props.onDeleteRoom}
                         onAdd={props.onAddRoom}/>
      </MainPage>
    </ViewportHandler>
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
