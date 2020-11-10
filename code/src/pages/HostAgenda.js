import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import { Colors }           from '../components/theme/Colors';
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
    <HostStatusCard pollStatus={props.pollStatus}
                    onStatusClick={props.onStatusClick}
                    headerColor={Colors.White}
                    textColor={Colors.White}
                    cardColor={`none`} borderColor={Colors.White}
                    {...size}/>
  )
}

const AgendaComponent = ( props ) => {

  const size = getSize(props.viewport)
  console.log('here')
  console.log(props.viewport)

  return props.editing ?
      <HostEditAgendaCard {...size} onAddClick={props.onAddClick}
                                 onDeleteClick={props.onDeleteClick}
                                 onDragEnd={props.onDragEnd}
                                 onTitleChange={props.onTitleChange}
                                 onPollEditClick={props.onPollEditClick}
                                 {...props.cardProps}/> :
      <HostAgendaCard {...size} {...props.cardProps}
                      onStatusClick={props.onUpdatePollStatus}
                      onViewClick={props.onViewClick}/>

}

const HostRoomPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';

  useEffect(() =>  {
    // console.log(props);
    props.onFetchAgenda(roomcode);
  }, [])

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
      history.push(`/PollResults/${roomcode}/${poll_id}`) :
      history.push(`/HostPoll/${roomcode}/${poll_id}`)
  };

  const onPollEditClick = (poll_id) => {
    props.onEditClick(roomcode);
    // props.togglePollEdit();
    history.push(`/HostPoll/${roomcode}/${poll_id}`, {editing: true})
  }

  // const sideContent =
  //   <HostStatusCard pollStatus={props.status}
  //                   onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, newStatus)}
  //                   headerColor={Colors.White}
  //                   textColor={Colors.White}
  //                   cardColor={`none`} borderColor={Colors.White}
  //                   medium/>
  //
  // return (
  //   <SideBarPage sideContent={sideContent} color={Colors.LightBlue}>
  //     { props.editing ?
  //       <HostEditAgendaCard medium onAddClick={() => props.onAddClick(roomcode)}
  //                                  onDeleteClick={props.onDeleteClick}
  //                                  onDragEnd={props.onDragEnd}
  //                                  onTitleChange={props.onTitleChange}
  //                                  onPollEditClick={onPollEditClick}
  //                                  {...cardProps}/> :
  //       <HostAgendaCard medium {...cardProps}
  //                       onStatusClick={(poll_id, newStatus) => props.onUpdatePollStatus(roomcode, poll_id, newStatus)}
  //                       onViewClick={onViewClick}/> }
  //   </SideBarPage>
  // )

  const sideContent = <SideBarComponent pollStatus={props.status}
                                        onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, newStatus)}/>

  return (
    <ViewportHandler>
      <SideBarPage sideContent={sideContent} color={Colors.LightBlue}>
        <AgendaComponent editing={props.editing}
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
    loading: state.hostagenda.loading
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
