import React, { useEffect } from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';

import HostAgendaCard        from '../components/cards/HostAgendaCard';
import HostEditAgendaCard        from '../components/cards/HostEditAgendaCard';

// import { fetchAgenda } from '../store/MockDataFunctions';
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

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
  height: 80%;
  width: 80%;
`;

// class HostAgendaPage extends React.Component {
//
//   constructor(props) {
//     super(props)
//
//     this.state = { isEditing: false }
//
//     this.onEditClick = this.onEditClick.bind(this);
//   }
//
//   async onEditClick() {
//     await this.setState({
//       ...this.state,
//       isEditing: !this.state.isEditing
//     })
//   }
//
//   render() {
//
//     const cardProps = {
//
//     }
//
//     return(
//       <PageWrapper>
//         <DemoNavBar />
//         <ComponentWrapper>
//           { this.state.isEditing ?
//             <HostEditAgendaCard medium
//                                 openPolls={agenda.openPolls}
//                                 pendingPolls={agenda.pendingPolls}
//                                 closedPolls={agenda.closedPolls}
//                                 pendingOrder={agenda.pendingOrder}
//                                 onEditClick={this.onEditClick}/> :
//             <HostAgendaCard medium
//                             openPolls={agenda.openPolls}
//                             pendingPolls={agenda.pendingPolls}
//                             closedPolls={agenda.closedPolls}
//                             pendingOrder={agenda.pendingOrder}
//                             onEditClick={this.onEditClick}/> }
//         </ComponentWrapper>
//       </PageWrapper>
//     )
//   }
//
// }

const HostAgendaPage = ( props ) => {

  const roomcode = '0002';

  useEffect(() =>  {
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

  console.log(props);


  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        { props.editing ?
          <HostEditAgendaCard medium onAddClick={props.onAddClick}
                                     onDeleteClick={props.onDeleteClick}
                                     onDragEnd={props.onDragEnd}
                                     {...cardProps}/> :
          <HostAgendaCard medium {...cardProps}/> }
      </ComponentWrapper>
    </PageWrapper>
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
    onAddClick: () => dispatch({ type: ActionTypes.hostagenda.ADD_POLL }),
    onDeleteClick: (poll_id) => dispatch({ type: ActionTypes.hostagenda.DELETE_POLL,
                                           poll_id }),
    onDragEnd: (newPendingOrder) => dispatch({ type: ActionTypes.hostagenda.UPDATE_ORDER,
                                        newPendingOrder }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostAgendaPage);
