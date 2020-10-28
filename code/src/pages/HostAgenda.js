import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import { Colors }           from '../components/theme/Colors';

import SideBarPage          from './format-pages/SideBarPage';

import HostAgendaCard       from '../components/cards/HostAgendaCard';
import HostEditAgendaCard   from '../components/cards/HostEditAgendaCard';
import HostStatusCard       from '../components/cards/HostStatusCard'

const HostAgendaPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';

  useEffect(() =>  {
    console.log(props);
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
    props.onEditClick(poll_id);
    // props.togglePollEdit();
    history.push(`/HostPoll/${roomcode}/${poll_id}`)
  }

  const sideContent =
    <HostStatusCard pollStatus={props.status}
                    onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, newStatus)}
                    headerColor={Colors.White}
                    textColor={Colors.White}
                    cardColor={`none`} borderColor={Colors.White}
                    medium/>

  return (
    <SideBarPage sideContent={sideContent} color={Colors.LightBlue}>
      { props.editing ?
        <HostEditAgendaCard medium onAddClick={() => props.onAddClick(roomcode)}
                                   onDeleteClick={props.onDeleteClick}
                                   onDragEnd={props.onDragEnd}
                                   onTitleChange={props.onTitleChange}
                                   onPollEditClick={onPollEditClick}
                                   {...cardProps}/> :
        <HostAgendaCard medium {...cardProps}
                        onStatusClick={(poll_id, newStatus) => props.onUpdatePollStatus(roomcode, poll_id, newStatus)}
                        onViewClick={onViewClick}/> }
    </SideBarPage>
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

export default connect(mapStateToProps, mapDispatchToProps)(HostAgendaPage);
