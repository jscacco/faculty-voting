import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';
import history              from '../history';

import { Colors }           from '../components/theme/Colors';
import SideBarPage          from './format-pages/SideBarPage';

import HostPollCard         from '../components/cards/HostPollCard';
import EditPollCard         from '../components/cards/EditPollCard';
import HostPollStatusCard   from '../components/cards/HostPollStatusCard';
import HostEditPanelCard    from '../components/cards/HostEditPanelCard';
import HostQuickPollCard    from '../components/cards/HostQuickPollCard';


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
    [<HostEditPanelCard pollType={props.poll.type}
                       userInputOption={props.poll.userInputOption}
                       showResults={props.poll.showResults}
                       updateSettings={props.onUpdateSettings}
                       medium
                       />] :
    [<HostPollStatusCard pollStatus={props.poll.status}
                        onStatusClick={(newStatus) => props.onUpdateStatus(roomcode, pollcode, newStatus)}
                        medium/>,
     <HostQuickPollCard pollStatus={'open'}
                        medium/>
    ]

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


// class HostPollPage extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       poll: fetchPollData('0002', '02'),
//       isEditing: false,
//
//       submitted: false,
//       submitButton: {
//         submitted: false,
//         color: Colors.LightGrey,
//         text: 'Submit',
//         statusText: 'Select your choice.'
//       },
//       selectedOptions: [],
//     }
//
//     this.setState({
//       ...this.state,
//       onSelectOption: Array(this.state.poll.options.length).fill(false),
//
//     })
//
//     console.log(this.state.poll)
//
//     this.onEditClick = this.onEditClick.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onOptionChange = this.onOptionChange.bind(this);
//   }
//
//
//   async onEditClick() {
//     await this.setState({
//       ...this.state,
//       isEditing: !this.state.isEditing
//     })
//   }
//
//   async onSubmit() {
//     await this.setState({
//       ...this.state,
//       submitted: true,
//       submitButton: {
//         color: Colors.Green,
//         text: 'Submitted',
//         statusText: 'Your vote has been recorded.',
//       }
//     })
//   }
//
//   async onOptionChange(event) {
//     await this.setState({
//       ...this.state,
//       submitButton: {
//         color: this.state.submitted ? Colors.Yellow : Colors.Blue,
//         text: this.state.submitted ? 'Resubmit' : 'Submit',
//         statusText: this.state.submitted ? 'Resubmit my vote.' : 'Submit my vote.',
//       }
//     })
//   }
//
//   render() {
//     return (
//       <PageWrapper>
//         <DemoNavBar />
//         <ComponentWrapper>
//           { this.state.isEditing ?
//             <EditPollCard pollData={this.state.poll} onSubmit={this.onSubmit}
//                           onOptionChange={this.onOptionChange} onEditClick={this.onEditClick} /> :
//             <HostPollCard pollData={this.state.poll} onSubmit={this.onSubmit} onOptionChange={this.onOptionChange}
//                         buttonColor={this.state.submitButton.color} buttonText={this.state.submitButton.text}
//                         statusText={this.state.submitButton.statusText} onEditClick={this.onEditClick} />
//           }
//         </ComponentWrapper>
//       </PageWrapper>
//     );
//   }
// }
//
// export default HostPollPage;
