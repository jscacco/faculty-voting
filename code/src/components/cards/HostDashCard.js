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

import StatusSecondaryCard       from '../format-cards/StatusSecondaryCard';


const propTypes = {
  pendingRooms: PropTypes.arrayOf(PropTypes.object),
  openRooms: PropTypes.arrayOf(PropTypes.object),
  closedRooms: PropTypes.arrayOf(PropTypes.object),

  onViewClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

const defaultProps = {
  pendingRooms: [],
  openRooms: [],
  closedRooms: []
}


const SectionGroup = ( props ) => {
  const { rooms, onViewClick,
          onDelete, onAdd, ...rest } = props;

  const items = rooms.map((room, index) => (
    room.status === 'open' ?
    <HostRoomItem roomTitle={room.title}
              roomCode={room.roomCode}
              onViewClick={onViewClick}/> :
    <EditItem iconColor={Colors.White} onDelete={onDelete}>
      <HostRoomItem roomTitle={room.title}
                roomCode={room.roomCode}
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

  const { openRooms, pendingRooms, closedRooms,
          onViewClick, ...rest} = props;


  const renderSection = ( roomsSet ) => {
    return {
      content: <SectionGroup rooms={roomsSet.rooms} onViewClick={onViewClick}
                             onAdd={roomsSet.status === 'pending' ? () => console.log('AddPoll') : undefined}
                             {...rest}/>,
      status: roomsSet.status
    }
  }

  const sections = [ {rooms: openRooms, status:'open'},
                     {rooms: pendingRooms, status:'pending'},
                     {rooms: closedRooms, status:'closed'}];
  sections.filter((roomType) => roomType.rooms.length != 0);


  return (
    <StatusSecondaryCard header={'My Rooms'}
                      sections={sections.map(section => renderSection(section))}
                      {...rest}/>


  )

}

HostDashCard.propTypes = propTypes;
HostDashCard.defaultProps = defaultProps;

export default HostDashCard;
