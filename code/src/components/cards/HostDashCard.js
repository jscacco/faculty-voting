import React                from 'react';
import styled               from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { Colors }           from '../theme/Colors';
import Jumbo                from '../theme/Jumbo';
import Body                 from '../theme/Body';
import Button                from '../buttons/Button';

import Group                  from '../groups/Group';
import HostRoomItem                   from '../items/HostRoomItem';
import EditItem                   from '../items/EditItem';
import AddItem                   from '../items/AddItem';

import StatusTertiaryCard       from '../format-cards/StatusTertiaryCard';


const propTypes = {
  rooms: PropTypes.object,
  order: PropTypes.object,

  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  onViewClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

const defaultProps = {

}


const SectionGroup = ( props ) => {
  const { rooms, onViewClick,
          onDelete, onAdd, ...rest } = props;


  const items = rooms.map((room, index) => (
    room.status === 'open' ?
    <HostRoomItem roomTitle={room.title}
              roomCode={room.id}
              onViewClick={onViewClick}/> :
    <EditItem iconColor={Colors.White} onDelete={() => onDelete(room.id)}>
      <HostRoomItem roomTitle={room.title}
                roomCode={room.id}
                onViewClick={onViewClick}/>
    </EditItem>
  ));

  const addItems = items.map(item => item);
  addItems.push(<AddItem textColor={Colors.White}
                         iconColor={Colors.White}
                         onClick={onAdd}> Add a room </AddItem>);

  return (
    onAdd ?
      <Group {...rest}>
        {addItems}
      </Group> :
      <Group {...rest}>
        {items}
      </Group>
    )
}


const HostDashCard = ( props ) => {

  const { rooms, order,
          onViewClick, onDelete, onAdd, ...rest} = props;

  let statusList = ['open', 'pending', 'closed'];
  statusList = statusList.filter((status) => order[status].length != 0);


  const sections = statusList.map((status) => {

    const sectionRooms = order[status].map((room) => rooms[room])

    return {
      status: status,
      content: <SectionGroup rooms={sectionRooms}
                             onViewClick={onViewClick}
                             onDelete={onDelete}
                             onAdd={status === 'pending' ? onAdd : undefined}
                             {...rest}/>,
    }
  })

  return (
    <StatusTertiaryCard header={'My Rooms'}
                      sections={sections}
                      {...rest}/>
  )
}

HostDashCard.propTypes = propTypes;
HostDashCard.defaultProps = defaultProps;

export default HostDashCard;
