import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import PollData          from '../../data-containers/PollData';

import { Colors }        from '../theme/Colors';
import EditButton             from '../buttons/EditButton';
import StatusTertiaryCard from '../format-cards/StatusTertiaryCard';

import Group              from '../groups/Group';
import EditingGroup                 from '../groups/EditingGroup';
import EditItem                  from '../items/EditItem';
import AddItem                  from '../items/AddItem';
import HostEditAgendaItem                  from '../items/HostEditAgendaItem';


const propTypes = {
  roomcode: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,

  polls: PropTypes.object,
  order: PropTypes.object,

  onDragEnd: PropTypes.func,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onViewClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
};

const HeaderButton = (props) => (
  <EditButton type={'save'} color={Colors.White} onClick={props.onEditClick} {...props.size}/>
)

const AddComponent = ( props ) => {
  return (
    <AddItem onClick={props.onAddClick} textColor={Colors.White} iconColor={Colors.White}>
      Add new poll
    </AddItem>
  )
}

const PendingSectionGroup = ( props ) => {

  const { roomcode, polls, order,
          onDragEnd, onAddClick, onDeleteClick, onEditClick,
          size} = props;


  return (
    <EditingGroup addItem={<AddComponent onAddClick={onAddClick}/>}
                  order={order}
                  onDragEnd={onDragEnd}
                  {...size}>
      {order.map((id) => {
        const poll = polls[id];

        return (
        <EditItem id={id} onDelete={() => onDeleteClick(id)} iconColor={Colors.White}>
          <HostEditAgendaItem text={poll.title} buttonText={'EDIT'} onClick={onEditClick}/>
        </EditItem>
      )})}
    </EditingGroup>
  )
}

const SectionGroup = ( props ) => {
  const { roomcode, polls, order, onViewClick, size} = props;

  return (
    <Group {...size}>
      { order.map((id) => {
        const poll = polls[id];
        return (
        <HostEditAgendaItem text={poll.title} buttonText={'VIEW'} onClick={onViewClick}/>
      )}) }
    </Group>
  )
}

const HostEditAgendaCard = ( props ) => {

  const { roomcode, title, status, polls, order,
          onDeleteClick, onViewClick, onEditClick,
          onDragEnd, onAddClick,
          ...rest } = props;

  const size = {
    extraSmall: props.extraSmall,
    small: props.small,
    medium: props.medium,
    large: props.large,
    extraLarge: props.extraLarge
  }

  let statusList = ['open', 'closed'];
  statusList = statusList.filter((status) => order[status] && order[status].length != 0);
  // statusList = ['pending'].concat(statusList);

  // console.log([].map(i => i));

  let sections = [
    { status: 'pending',
      content: (
        <PendingSectionGroup roomcode={roomcode}
                             polls={polls}
                             order={order['pending']}
                             onDragEnd={onDragEnd}
                             onEditClick={onEditClick}
                             onAddClick={onAddClick}
                             onDeleteClick={onDeleteClick}
                             size={size}/>
      )
    }
  ]

  for (let i = 0; i < statusList.length; i++) {
    let status = statusList[i];
    sections.push({
      status: status,
      content: (
        <SectionGroup roomcode={roomcode}
                      polls={polls}
                      order={order[status]}
                      size={size}/>
      )
    })
  }

  return (
    <StatusTertiaryCard header={props.roomTitle}
                         headerButton={<HeaderButton onEditClick={onEditClick} size={size}/>}
                         sections={sections}
                         width={'100%'}
                         {...size}/>
  )

}

// class HostEditAgendaCard extends React.Component {
//
//   constructor(props){
//     super(props);
//
//     this.size = {
//       extraSmall: props.extraSmall,
//       small: props.small,
//       medium: props.medium,
//       large: props.large,
//       extraLarge: props.extraLarge
//     }
//
//     this.sections = [
//       { status: 'pending',
//         content: undefined },
//       { status: 'open',
//         content: <SectionGroup polls={props.openPolls} onViewClick={props.onViewClick} {...this.size}/> },
//       { status: 'closed',
//         content: <SectionGroup polls={props.closedPolls} onViewClick={props.onViewClick} {...this.size}/> },
//     ]
//
//     this.state = {
//       pendingPolls: props.pendingPolls,
//       pendingOrder: props.pendingOrder
//     };
//
//     this.onDelete = this.onDelete.bind(this);
//     this.onAdd = this.onAdd.bind(this);
//     this.onDragEnd = this.onDragEnd.bind(this);
//
//   }
//
//   async onDelete( index ){
//     let newPendingPolls = this.state.pendingPolls.map(item => item);
//     newPendingPolls.splice(index, 1);
//
//     let newPendingOrder = this.state.pendingOrder.filter((i) => i != index);
//     newPendingOrder = newPendingOrder.map((i) => i > index ? i - 1 : i)
//
//     await this.setState({
//       ...this.state,
//       pendingPolls: newPendingPolls,
//       pendingOrder: newPendingOrder
//     })
//   }
//
//   async onAdd() {
//     const newPoll = PollData;
//     const newPendingPolls = this.state.pendingPolls.map(item => item);
//     newPendingPolls.push(newPoll)
//
//     const newPendingOrder = this.state.pendingOrder.map(item => item);
//     newPendingOrder.push(newPendingPolls.length - 1);
//
//     await this.setState({
//       ...this.state,
//       pendingPolls: newPendingPolls,
//       pendingOrder: newPendingOrder
//     })
//   }
//
//   async onDragEnd(newOrder) {
//     await this.setState({
//       ...this.state,
//       pendingOrder: newOrder
//     })
//   }
//
//   addPollComponent = (
//     <AddItem onClick={() => this.onAdd(this)} textColor={Colors.White} iconColor={Colors.White}>
//       Add new poll
//     </AddItem>
//   )
//
//
//   render() {
//
//     const pendingContent = (
//       <EditingGroup addItem={this.addPollComponent} order={this.state.pendingOrder}
//                     onDragEnd={this.onDragEnd}
//                     {...this.size}>
//         {this.state.pendingPolls.map((poll, index) => (
//           <EditItem onDelete={() => this.onDelete(index)} iconColor={Colors.White}>
//             <HostEditAgendaItem text={poll.title} buttonText={'EDIT'} onClick={this.props.onEditClick}/>
//           </EditItem>
//         ))}
//       </EditingGroup>
//     )
//
//     this.sections[0].content = pendingContent;
//
//     const headerButton = (
//       <EditButton type={'save'} color={Colors.White} onClick={this.props.onEditClick}/>
//     )
//
//     return (
//       <StatusTertiaryCard header={this.props.roomTitle}
//                            headerButton={headerButton}
//                            sections={this.sections}
//                            {...this.size}/>
//     )
//   }
// }

HostEditAgendaCard.propTypes = propTypes;
HostEditAgendaCard.defaultProps = defaultProps;

export default HostEditAgendaCard;
