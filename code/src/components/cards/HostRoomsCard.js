import React                from 'react';
import styled               from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { Colors }           from '../theme/Colors';
import Jumbo                from '../theme/Jumbo';

import Button                from '../buttons/Button';

import Card                 from './Card';
import HostBaseItem           from '../listItems/HostBaseItem';

const propTypes = {
  pendingItems: PropTypes.arrayOf(PropTypes.object),
  openItems: PropTypes.arrayOf(PropTypes.object),
  closedItems: PropTypes.arrayOf(PropTypes.object),


}

const ItemWrapper = styled.div`
  padding-bottom: ${({lastChild}) => lastChild ? 0 : 18}px;
`;


const ComponentWrapper = styled.div `
  padding-bottom: 30px;
`;

const renderItems = ( rooms, status ) => {

  const renderedItems = rooms.map((item, index) => {
    const lastChild = index === rooms.length -1;

    return (
      <ItemWrapper lastChild={lastChild}>
        <HostBaseItem text={item.title} status={status}/>
      </ItemWrapper>
    )
  })

  let header;
  switch (status) {
    case 'open':
      header = 'Open Rooms'
      break;
    case 'closed':
      header = 'Closed Rooms'
      break;
    default:
      header = 'Pending Rooms'
  }

  return (
    <ComponentWrapper>
      <ItemWrapper>
        <Jumbo threeExtraSmall color={Colors.White}>
          {header}
        </Jumbo>
      </ItemWrapper>
      {renderedItems}
    </ComponentWrapper>
  )
}

const HostRoomsCard = ( props ) => {

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

export default HostRoomsCard;
