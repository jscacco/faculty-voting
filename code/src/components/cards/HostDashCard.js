import React                from 'react';
import styled               from 'styled-components';
import PropTypes                      from 'prop-types';
import ExtraPropTypes                 from 'react-extra-prop-types';

import { Colors }           from '../theme/Colors';
import Jumbo                from '../theme/Jumbo';

import Button                from '../buttons/Button';

import ItemGroup              from '../item-groups/ItemGroup';
import HostRoomItem           from '../items/HostRoomItem';
import HostDashCardBase       from './HostDashCardBase';


const propTypes = {
  pendingItems: PropTypes.arrayOf(PropTypes.object),
  openItems: PropTypes.arrayOf(PropTypes.object),
  closedItems: PropTypes.arrayOf(PropTypes.object),

  onViewClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

// const ItemWrapper = styled.div`
//   padding-bottom: ${({lastChild}) => lastChild ? 0 : 18}px;
// `;


const ComponentWrapper = styled.div `
  padding-bottom: 20px;
`;

// cont renderItems = ( rooms, status, props ) => {
//
//   const { onViewClick, extraSmall, small, medium, large, extraLarge } = props;
//
//   const renderedItems = ( poll ) => (
//     <ItemGroup>
//       { polls.map((poll, index) => (
//         <HostAgendaItem pollTitle={poll.title} status={poll.status}
//                         onViewClick={onViewClick ? () => onViewClick(index) : undefined}
//                         onStatusButtonClick={onStatusButtonClick ? () => onStatusButtonClick(index) : undefined}/>
//       )) }
//     </ItemGroup>
//   );
//
//
// }

const HostDashCard = ( props ) => {

  const { openRooms, pendingRooms, closedRooms,
          onViewClick,
          extraSmall, small, medium, large, extraLarge } = props;

  const renderedItems = ( polls ) => (
    <ItemGroup>
      { polls.map((poll, index) => (
        <HostRoomItem roomTitle={poll.title} status={poll.status} roomCode={poll.roomCode}
                        onViewClick={onViewClick ? () => onViewClick(index) : undefined}/>
      )) }
    </ItemGroup>
  );

  return (
    <HostDashCardBase header={'My Rooms'}
                      openComponents={renderedItems(openRooms)}
                      closedComponents={renderedItems(closedRooms)}
                      pendingComponents={renderedItems(pendingRooms)}
                      extraSmall={extraSmall} small={small}
                      medium={medium} large={large} extraLarge={extraLarge}/>


  )

}

// const renderItems = ( rooms, status, props ) => {
//
//   const { onViewClick, extraSmall, small, medium, large, extraLarge } = props;
//
//   const renderedItems = rooms.map((item, index) => {
//     const lastChild = index === rooms.length -1;
//
//     return (
//       <ItemWrapper lastChild={lastChild}>
//         <HostRoomItem pollTitle={item.title} roomCode={'A1B2C3'} status={status}/>
//       </ItemWrapper>
//     )
//   })
//
//   let header;
//   let headerColor;
//   switch (status) {
//     case 'open':
//       header = 'Open Rooms';
//       headerColor = Colors.Green;
//       break;
//     case 'closed':
//       header = 'Closed Rooms'
//       headerColor = Colors.Red
//       break;
//     default:
//       header = 'Pending Rooms';
//       headerColor = Colors.LightGrey;
//   }
//
//   return (
//     <ComponentWrapper>
//       <ItemWrapper>
//         <StatusText extraLarge status={status} color={Colors.White}>
//           {header}
//         </StatusText>
//       </ItemWrapper>
//       {renderedItems}
//     </ComponentWrapper>
//   )
// }
//
// const HostDashCard = ( props ) => {
//
  // const { openRooms, pendingRooms, closedRooms,
  //         extraSmall, small, medium, large, extraLarge } = props;
//
//   return (
//     <Card color={Colors.LightBlue}>
//       <ComponentWrapper>
//         <Jumbo twoExtraSmall={extraSmall} extraSmall={small}
//                 small={medium} medium={large} large={extraLarge}
//                 color={Colors.White}>
//           My Rooms
//         </Jumbo>
//       </ComponentWrapper>
//       {renderItems(openRooms, 'open', props)}
//       {renderItems(pendingRooms, 'pending', props)}
//       {renderItems(closedRooms, 'closed', props)}
//     </Card>
//   )
// }
//
export default HostDashCard;
