import React, { useEffect, useContext } from 'react';
import { UserContext } from "../UserProvider";

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import LoadingCard             from '../components/cards/LoadingCard'

import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';
import { Colors }           from '../components/theme/Colors';

import HostDashCard         from '../components/cards/HostDashCard';

const DashComponent = ( props ) => {

  let size = {};
  switch (props.viewport) {
    case 'mobile':
    case 'smallMobile':
    case 'tablet':
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      size.medium = true;
      break;
    default:
      size.small = true;
  }

  if (props.loading) {
    return (
      <LoadingCard cardColor={Colors.Blue}
                   cardBorderColor={Colors.White}
                   textColor={Colors.White}
                   {...size}/>
    );
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

  // const user = useContext(UserContext);
  console.log(props);
  const { user, onFetchRooms, history } = props;

  useEffect(() =>  {
    console.log(user)
    if ( user === null) {
      alert('Please login with Hamilton affiliated email to access.')
      history.replace('/Login', [])
    }
    else if ( user !== undefined ){ onFetchRooms() };
  }, [user, onFetchRooms, history])

  if ( props.error ) { alert('Error! Please try again.'); history.replace('/HostDash') }

  const onViewClick = (roomcode, roomStatus) => {
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
                         loading={props.loading}
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
    user: state.auth.user,
    rooms: state.hostdash.rooms,
    order: state.hostdash.order,
    loading: state.auth.user === undefined || state.hostdash.loading,
    error: state.hostdash.error,
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
