import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import LoadingCard              from '../components/cards/LoadingCard';

import { Colors }           from '../components/theme/Colors';
import RoomcodeHeader       from '../components/theme/RoomcodeHeader';
import ViewportHandler      from './format-pages/ViewportHandler';
import SideBarPage          from './format-pages/SideBarPage';

import HostAgendaCard       from '../components/cards/HostAgendaCard';
import HostEditAgendaCard   from '../components/cards/HostEditAgendaCard';
import HostStatusCard       from '../components/cards/HostStatusCard'


const getSize = (viewport) => {

  let size = {};
  switch (viewport) {
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

  return size;
}

const SideBarComponent = ( props ) => {

  const size = getSize(props.viewport)

  return (
    <HostStatusCard editing={props.editing}
                    loading={props.loading}
                    pollStatus={props.pollStatus}
                    onStatusClick={props.onStatusClick}
                    headerColor={Colors.White}
                    textColor={Colors.White}
                    cardColor={`none`} borderColor={Colors.White}
                    {...size}/>
  )
}

const AgendaComponent = ( props ) => {

  const size = getSize(props.viewport)

  let agendaContent;

  if (props.loading) {
    agendaContent = (
      <LoadingCard cardColor={Colors.Blue}
                   cardBorderColor={Colors.White}
                   textColor={Colors.White}
                   {...size}/>
    );
  }
  else if ( props.editing ) {
    agendaContent = (
    <HostEditAgendaCard {...size} onAddClick={props.onAddClick}
                               onDeleteClick={props.onDeleteClick}
                               onDragEnd={props.onDragEnd}
                               onTitleChange={props.onTitleChange}
                               onPollEditClick={props.onPollEditClick}
                               {...props.cardProps}/>
    );
  }
  else {
    agendaContent = (
      <HostAgendaCard {...size} {...props.cardProps}
                      onStatusClick={props.onStatusClick}
                      onViewClick={props.onViewClick}/>
    )
  }

  return agendaContent
}

const HostRoomPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';

  useEffect(() =>  {
    // console.log(props);
    props.onFetchAgenda(roomcode);
  }, [])

  // if ( props.loading ) { return <Loading/> }
  if ( props.error ) { console.log(props.error); history.replace('/Login') }

  const cardProps = {
    roomcode: roomcode,
    title: props.title,
    status: props.status,
    polls: props.polls,
    order: props.order,
    onEditClick: () => props.onEditClick(roomcode),
  }


  const onViewClick = (poll_id) => {
    props.polls[poll_id].status === 'closed' ?
      history.push(`/PollResults/${roomcode}/${poll_id}`, {roomStatus: props.status}) :
      history.push(`/HostPoll/${roomcode}/${poll_id}`, {roomStatus: props.status})
  };

  const onPollEditClick = (poll_id) => {
    props.onEditClick(roomcode);
    history.push(`/HostPoll/${roomcode}/${poll_id}`, {roomStatus: props.status, editing: true})
  }

  const sideContent = <SideBarComponent editing={props.editing}
                                        loading={props.loading}
                                        pollStatus={props.status}
                                        onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, newStatus)}/>

  return (
    <ViewportHandler>
      <SideBarPage sideContent={sideContent} color={Colors.Blue} roomcode={roomcode}>
        <AgendaComponent editing={props.editing}
                         loading={props.loading}
                         roomcode={roomcode}
                         onAddClick={() => props.onAddClick(roomcode)}
                         onDeleteClick={props.onDeleteClick}
                         onDragEnd={props.onDragEnd}
                         onTitleChange={props.onTitleChange}
                         onPollEditClick={onPollEditClick}
                         onStatusClick={(poll_id, newStatus) => props.onUpdatePollStatus(roomcode, poll_id, newStatus)}
                         onViewClick={onViewClick}
                         cardProps={cardProps}/>
      </SideBarPage>
    </ViewportHandler>
  )
}


const mapStateToProps = (state) => {

  return {
    title: state.hostagenda.title,
    status: state.hostagenda.status,
    polls: state.hostagenda.polls,
    order: state.hostagenda.order,
    editing: state.hostagenda.editing,
    loading: state.hostagenda.loading,
    error: state.hostagenda.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAgenda: (room_id) => dispatch({ type: ActionTypes.hostagenda.FETCH_AGENDA_START,
                                            room_id }),
    onEditClick: (room_id) => { dispatch({ type: ActionTypes.hostagenda.TOGGLE_EDIT })
                                dispatch({ type: ActionTypes.hostagenda.UPDATE_AGENDA_START,
                                          room_id })},
    onTitleChange: (event) => { dispatch({ type: ActionTypes.hostagenda.UPDATE_TITLE,
                                             event })},
    onAddClick: (room_id) => dispatch({ type: ActionTypes.hostagenda.ADD_POLL_START,
                                 room_id }),
    onDeleteClick: (poll_id) => dispatch({ type: ActionTypes.hostagenda.DELETE_POLL,
                                           poll_id }),
    onDragEnd: (newPendingOrder) => dispatch({ type: ActionTypes.hostagenda.UPDATE_ORDER,
                                        newPendingOrder }),
    onUpdatePollStatus: (room_id, poll_id, newStatus) => dispatch({ type: ActionTypes.hostagenda.UPDATE_POLL_STATUS_START,
                                                              room_id, poll_id, newStatus }),
    onUpdateStatus: (room_id, newStatus) => dispatch({ type:ActionTypes.hostagenda.UPDATE_ROOM_STATUS_START,
                                                    room_id, newStatus }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostRoomPage);
