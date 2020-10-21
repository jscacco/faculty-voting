import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import HostPollCard         from '../components/cards/HostPollCard';
import EditPollCard         from '../components/cards/EditPollCard';
import HostEditPanelCard    from '../components/cards/HostEditPanelCard';

import { fetchPollData } from '../store/MockDataFunctions'
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';
import MainSidebar      from './format-pages/MainSidebar'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  position: fixed;
  overflow: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComponentWrapper = styled.div`
  border: 1px solid black;
  height: 80%;
  width: 80%;
`;

const HostPollPage = ( props ) => {

  const roomcode = '0002';
  const pollcode = '00';

  useEffect(() =>  {
    props.onFetchPoll(roomcode, pollcode);
  }, [])

  console.log(props);


  return (
    <PageWrapper>
      <MainSidebar header={<DemoNavBar />}
                   sideContent={props.editing ?
                     <HostEditPanelCard pollType={props.poll.type}
                                        userInputOption={props.poll.userInputOption}
                                        showResults={props.poll.showResults}
                                        updateSettings={props.onUpdateSettings}
                                        /> : undefined}>
        { props.editing ?
          <EditPollCard pollData={props.poll}
                        onEditClick={props.onToggleEdit}
                        onAddClick={props.onAddOption}
                        onDeleteClick={props.onDeleteOption}
                        onDragEnd={props.onUpdateOrder}
                        onTitleChange={props.onUpdateTitle}
                        onDescriptionChange={props.onUpdateDescription}
                        onOptionChange={props.onUpdateOption}
                        medium /> :
          <HostPollCard pollData={props.poll}
                        onEditClick={props.onToggleEdit}
                        medium />
        }
      </MainSidebar>
    </PageWrapper>
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
    onToggleEdit: () => dispatch({ type: ActionTypes.hostpoll.TOGGLE_EDIT,}),
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
