import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';
import history              from '../history';

import { Colors }           from '../components/theme/Colors';
import SideBarPage          from './format-pages/SideBarPage';

import HostPollCard         from '../components/cards/HostPollCard';
import EditPollCard         from '../components/cards/EditPollCard';
import HostStatusCard       from '../components/cards/HostStatusCard'
import HostEditPanelCard    from '../components/cards/HostEditPanelCard';



const HostPollPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000';
  const pollcode = props.match.params.pollcode || '00';

  useEffect(() =>  {
    props.onFetchPoll(roomcode, pollcode);
  }, [])


  if (props.poll.status === 'closed') {
    console.log('here')
    history.replace(`/PollResults/${roomcode}/${pollcode}`);
  }

  console.log(props);

  const sideContent = props.editing ?
    <HostEditPanelCard pollType={props.poll.type}
                       userInputOption={props.poll.userInputOption}
                       showResults={props.poll.showResults}
                       updateSettings={props.onUpdateSettings}
                       medium
                       /> :
    <HostStatusCard pollStatus={props.poll.status}
                        onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, pollcode, newStatus)}
                        medium/>

  return (
      <SideBarPage sideContent={sideContent}>
        { props.editing ?
          <EditPollCard pollData={props.poll}
                        onEditClick={() => props.onToggleEdit(roomcode, pollcode)}
                        onAddClick={props.onAddOption}
                        onDeleteClick={props.onDeleteOption}
                        onDragEnd={props.onUpdateOrder}
                        onTitleChange={props.onUpdateTitle}
                        onDescriptionChange={props.onUpdateDescription}
                        onOptionChange={props.onUpdateOption}
                        medium /> :
          <HostPollCard pollData={props.poll}
                        onEditClick={() => props.onToggleEdit(roomcode, pollcode)}
                        medium />
        }
      </SideBarPage>
  );
}

const mapStateToProps = (state) => {

  return {
    poll: state.hostpoll.poll,
    editing: state.hostpoll.editing,
    loading: state.hostpoll.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPoll: (room_id, poll_id ) => dispatch({ type: ActionTypes.hostpoll.FETCH_POLL_START,
                                                   room_id, poll_id }),
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
