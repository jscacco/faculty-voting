import React, { useEffect } from 'react';
import styled                from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import LoadingCard              from '../components/cards/LoadingCard';

import { Colors }           from '../components/theme/Colors';
import ViewportHandler      from './format-pages/ViewportHandler';
import SideBarPage          from './format-pages/SideBarPage';

import HostAgendaCard       from '../components/cards/HostAgendaCard';
import HostEditAgendaCard   from '../components/cards/HostEditAgendaCard';
import HostStatusCard       from '../components/cards/HostStatusCard'
import HostUploadVotersCard from '../components/cards/HostUploadVotersCard';

const SidePanelComponentWrapper = styled.div`
  padding-bottom: 1vh;
`;


const getSize = (viewport) => {

  let size = {};
  switch (viewport) {
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

  size.viewport = viewport;
  return size;
}

const SideBarComponent = ( props ) => {

  const size = getSize(props.viewport)

  return (
    props.editing || props.roomStatus !== 'pending' ?
    <HostStatusCard editing={props.editing}
                    loading={props.loading}
                    pollStatus={props.pollStatus}
                    onStatusClick={props.onStatusClick}
                    headerColor={Colors.White}
                    textColor={Colors.White}
                    cardColor={`none`} borderColor={Colors.White}
                    {...size}/> :
    <>
      <SidePanelComponentWrapper>
        <HostStatusCard editing={props.editing}
                        loading={props.loading}
                        pollStatus={props.pollStatus}
                        onStatusClick={props.onStatusClick}
                        headerColor={Colors.White}
                        textColor={Colors.White}
                        cardColor={`none`} borderColor={Colors.White}
                        {...size}/>
      </SidePanelComponentWrapper>
      <HostUploadVotersCard loading={props.loading}
                            onUpload={props.onUpload}
                            headerColor={Colors.White}
                            textColor={Colors.White}
                            cardColor={`none`} borderColor={Colors.White}
                            fileUploaded={props.fileUploaded}
                            {...size}/>
  </>
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
                               onViewClick={props.onViewClickEditing}
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

  const roomcode = props.match.params.roomcode;
  const { user, onFetchAgenda, history } = props;

  useEffect(() =>  {
    if ( user === null) {
      alert('Please login with Hamilton affiliated email to access.')
      history.replace('/Login', [])
    }
    else if ( user !== undefined ){ onFetchAgenda(roomcode); }
  }, [user, roomcode, onFetchAgenda, history])

  if ( props.error ) { alert('Error! Please try again.'); history.replace('/HostDash') }

  console.log(props)

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

  const onViewClickEditing = ( poll_id ) => {
    props.onEditClick(roomcode);
    onViewClick(poll_id);
  }

  const onPollEditClick = (poll_id) => {
    props.onEditClick(roomcode);
    history.push(`/HostPoll/${roomcode}/${poll_id}`, {roomStatus: props.status, editing: true})
  }

  const sideContent = <SideBarComponent roomStatus={props.status}
                                        editing={props.editing}
                                        loading={props.loading}
                                        pollStatus={props.status}
                                        onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, newStatus)}
                                        onUpload={(filename, voters) => props.onUploadVoters(roomcode, filename, voters)}
                                        fileUploaded={props.fileUploaded}/>

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
                         onViewClickEditing={onViewClickEditing}
                         cardProps={cardProps}/>
      </SideBarPage>
    </ViewportHandler>
  )
}


const mapStateToProps = (state) => {

  return {
    user: state.auth.user,
    title: state.hostagenda.title,
    status: state.hostagenda.status,
    polls: state.hostagenda.polls,
    order: state.hostagenda.order,
    fileUploaded: state.hostagenda.fileUploaded,
    editing: state.hostagenda.editing,
    loading: state.auth.user === undefined || state.hostagenda.loading,
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
    onUploadVoters: (room_id, filename, voters) => dispatch({ type:ActionTypes.hostagenda.UPDATE_VOTERS_START,
                                                              room_id, voters, filename }),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostRoomPage);
