import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import PollData          from '../../data-containers/PollData';

import { Colors }        from '../theme/Colors';
import Input             from '../inputs/Input';
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

const Header = ( props ) => (
  <Input label={'Title'} type={'inputfield'}
         value={props.title} fontColor={Colors.White}
         onChange={props.onChange}
         backgroundColor={Colors.Blue}
         borderColor={Colors.White}
         labelColor={Colors.White}
         {...props.size}/>
)

const HeaderButton = (props) => (
  <EditButton type={'save'} color={Colors.White} onClick={props.onEditClick} {...props.size}/>
)

const AddComponent = ( props ) => {

  const { onAddClick, ...rest } = props;

  return (
    <AddItem onClick={onAddClick} textColor={Colors.White} iconColor={Colors.White} {...rest}>
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
          <HostEditAgendaItem text={poll.title} buttonText={'EDIT'} onClick={() => onEditClick(id)}/>
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
          onPollEditClick,
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

  let sections = [
    { status: 'pending',
      content: (
        <PendingSectionGroup roomcode={roomcode}
                             polls={polls}
                             order={order['pending']}
                             onDragEnd={onDragEnd}
                             onEditClick={onPollEditClick}
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
    <StatusTertiaryCard header={<Header title={props.title} onChange={props.onTitleChange} size={size}/>}
                        headerButton={<HeaderButton onEditClick={onEditClick} size={size}/>}
                        sections={sections}
                        width={'100%'}
                        height={props.extraSmall ? `100%` : `stretch`}
                        {...size}/>
  )

}

HostEditAgendaCard.propTypes = propTypes;
HostEditAgendaCard.defaultProps = defaultProps;

export default HostEditAgendaCard;
