import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import history              from '../history';

import { Colors }           from '../components/theme/Colors';

import MainPage             from './format-pages/MainPage';

import HostAgendaCard        from '../components/cards/HostAgendaCard';
import HostEditAgendaCard        from '../components/cards/HostEditAgendaCard';


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


  return (
    <MainPage color={Colors.LightBlue}>
      { props.editing ?
        <HostEditAgendaCard medium onAddClick={() => props.onAddClick(roomcode)}
                                   onDeleteClick={props.onDeleteClick}
                                   onDragEnd={props.onDragEnd}
                                   {...cardProps}/> :
        <HostAgendaCard medium {...cardProps}
                        onStatusClick={(poll_id, newStatus) => props.onStatusClick(roomcode, poll_id, newStatus)}
                        onViewClick={onViewClick}/> }
    </MainPage>
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
    onAddClick: (room_id) => dispatch({ type: ActionTypes.hostagenda.ADD_POLL_START,
                                 room_id }),
    onDeleteClick: (poll_id) => dispatch({ type: ActionTypes.hostagenda.DELETE_POLL,
                                           poll_id }),
    onDragEnd: (newPendingOrder) => dispatch({ type: ActionTypes.hostagenda.UPDATE_ORDER,
                                        newPendingOrder }),
    onStatusClick: (room_id, poll_id, newStatus) => dispatch({ type: ActionTypes.hostagenda.UPDATE_POLL_STATUS_START,
                                                              room_id, poll_id, newStatus }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostAgendaPage);
