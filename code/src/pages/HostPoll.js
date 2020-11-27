import React, { useEffect }                from 'react';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import LoadingCard              from '../components/cards/LoadingCard';

import { Colors }           from '../components/theme/Colors';
import ViewportHandler      from './format-pages/ViewportHandler';
import SideBarPage          from './format-pages/SideBarPage';

import HostPollCard         from '../components/cards/HostPollCard';
import EditPollCard         from '../components/cards/EditPollCard';
import HostStatusCard       from '../components/cards/HostStatusCard'
import HostEditPanelCard    from '../components/cards/HostEditPanelCard';

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

  return ( props.editing ?
    <HostEditPanelCard pollType={props.pollType}
                       userInputOption={props.userInputOption}
                       showResults={props.showResults}
                       updateSettings={props.updateSettings}
                       {...size}
                       /> :
    <HostStatusCard disable={props.roomStatus === 'pending'}
                    loading={props.loading}
                    pollStatus={props.pollStatus}
                    headerColor={Colors.Blue}
                    onStatusClick={props.onStatusClick}
                    {...size}/>
  )
}

const PollComponent = ( props ) => {

  const size = getSize(props.viewport)

  if (props.loading) {
    return (
      <LoadingCard cardColor={Colors.White}
                   cardBorderColor={Colors.White}
                   textColor={Colors.Blue}
                   {...size}/>
    );
  }

  return props.editing ?
    <EditPollCard pollData={props.pollData}
                  onEditClick={props.onEditClick}
                  onAddClick={props.onAddClick}
                  onDeleteClick={props.onDeleteClick}
                  onDragEnd={props.onDragEnd}
                  onTitleChange={props.onTitleChange}
                  onDescriptionChange={props.onDescriptionChange}
                  onOptionChange={props.onOptionChange}
                  {...size} /> :
    <HostPollCard pollData={props.pollData}
                  onEditClick={props.onEditClick}
                  {...size} />

}

const HostPollPage = ( props ) => {

  const roomcode = props.match.params.roomcode;
  const pollcode = props.match.params.pollcode;
  const { user, onFetchPoll, location, history } = props;

  useEffect(() =>  {
    if ( user === null) {
      alert('Please login with Hamilton affiliated email to access.')
      history.replace('/Login', [])
    }
    else if ( user !== undefined ){ onFetchPoll(roomcode, pollcode, location.state);}
  }, [user, roomcode, pollcode, onFetchPoll, location, history])

  if ( props.error ) { console.log(props.error); history.replace('/Login') }

  if (props.poll.status === 'closed') {
    history.replace(`/PollResults/${roomcode}/${pollcode}`);
  }

  const sideContent = (
    <SideBarComponent roomStatus={props.location.state.roomStatus}
                      loading={props.loading}
                      editing={props.editing}
                      pollType={props.poll.type}
                      pollStatus={props.poll.status}
                      userInputOption={props.poll.userInputOption}
                      showResults={props.poll.showResults}
                      updateSettings={props.onUpdateSettings}
                      onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, pollcode, newStatus)}/>
  )

  return (
    <ViewportHandler>
      <SideBarPage sideContent={sideContent} roomcode={roomcode}>
        <PollComponent loading={props.loading}
                       editing={props.editing}
                       pollData={props.poll}
                       onEditClick={() => props.onToggleEdit(roomcode, pollcode)}
                       onAddClick={props.onAddOption}
                       onDeleteClick={props.onDeleteOption}
                       onDragEnd={props.onUpdateOrder}
                       onTitleChange={props.onUpdateTitle}
                       onDescriptionChange={props.onUpdateDescription}
                       onOptionChange={props.onUpdateOption}/>
      </SideBarPage>
    </ViewportHandler>
  );
}

const mapStateToProps = (state) => {

  return {
    user: state.auth.user,
    poll: state.hostpoll.poll,
    editing: state.hostpoll.editing,
    loading: state.auth.user === undefined || state.hostagenda.loading,
    error: state.hostpoll.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPoll: (room_id, poll_id, location_state ) => dispatch({ type: ActionTypes.hostpoll.FETCH_POLL_START,
                                                                    room_id, poll_id, location_state }),
    onToggleEdit: (room_id, poll_id ) => { dispatch({ type: ActionTypes.hostpoll.TOGGLE_EDIT});
                                           dispatch({ type: ActionTypes.hostpoll.UPDATE_POLL_START,
                                           room_id, poll_id })},
    onAddOption: () => dispatch({ type: ActionTypes.hostpoll.ADD_POLL, }),
    onDeleteOption: (option_id) => dispatch({ type: ActionTypes.hostpoll.DELETE_POLL,
                                            option_id }),
    onUpdateOrder: (order) => dispatch({ type: ActionTypes.hostpoll.UPDATE_ORDER,
                                            order }),
    onUpdateOption: (option_id, event) => dispatch({ type: ActionTypes.hostpoll.UPDATE_OPTION,
                                            option_id, event }),
    onUpdateTitle: (event) => dispatch({ type: ActionTypes.hostpoll.UPDATE_TITLE,
                                          event }),
    onUpdateDescription: (event) => dispatch({ type: ActionTypes.hostpoll.UPDATE_DESCRIPTION,
                                               event }),
    onUpdateSettings: (settings) => dispatch({ type:ActionTypes.hostpoll.UPDATE_SETTINGS,
                                               settings }),
    onUpdateStatus: (room_id, poll_id, status) => dispatch({ type:ActionTypes.hostpoll.UPDATE_POLL_STATUS_START,
                                                               room_id, poll_id, status }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostPollPage);
