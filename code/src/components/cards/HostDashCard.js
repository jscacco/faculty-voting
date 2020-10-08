import React                from 'react';
import styled               from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { Colors }           from '../theme/Colors';
import Jumbo                from '../theme/Jumbo';

import Button                from '../buttons/Button';

import Card                 from './Card';
import HostRoomItem           from '../items/HostRoomItem';
import StatusText             from '../format-text/StatusText';


const propTypes = {
  pendingItems: PropTypes.arrayOf(PropTypes.object),
  openItems: PropTypes.arrayOf(PropTypes.object),
  closedItems: PropTypes.arrayOf(PropTypes.object),


}

const ItemWrapper = styled.div`
  padding-bottom: ${({lastChild}) => lastChild ? 0 : 18}px;
`;


const ComponentWrapper = styled.div `
  padding-bottom: 20px;
`;


const renderItems = ( rooms, status ) => {

  const renderedItems = rooms.map((item, index) => {
    const lastChild = index === rooms.length -1;

    return (
      <ItemWrapper lastChild={lastChild}>
        <HostRoomItem pollTitle={item.title} status={status}/>
      </ItemWrapper>
    )
  })

  let header;
  let headerColor;
  switch (status) {
    case 'open':
      header = 'Open Rooms';
      headerColor = Colors.Green;
      break;
    case 'closed':
      header = 'Closed Rooms'
      headerColor = Colors.Red
      break;
    default:
      header = 'Pending Rooms';
      headerColor = Colors.LightGrey;
  }

  return (
    <ComponentWrapper>
      <ItemWrapper>
        <StatusText extraLarge status={status} color={Colors.White}>
          {header}
        </StatusText>
      </ItemWrapper>
      {renderedItems}
    </ComponentWrapper>
  )
}

const HostDashCard = ( props ) => {

  const { openRooms, pendingRooms, closedRooms,
          small, medium, large} = props;

  return (
    <Card color={Colors.LightBlue}>
      <ComponentWrapper>
        <Jumbo extraSmall={small} small={medium} medim={large} color={Colors.White}>
          My Rooms
        </Jumbo>
      </ComponentWrapper>
      {renderItems(openRooms, 'open')}
      {renderItems(pendingRooms, 'pending')}
      {renderItems(closedRooms, 'closed')}
    </Card>
  )
}

export default HostDashCard;
