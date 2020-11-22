import React            from 'react';
import PropTypes        from 'prop-types';

import SecondaryCard      from '../format-cards/SecondaryCard'
import HostAgendaItem                from '../items/HostAgendaItem';
import Group                 from '../groups/Group'

import { Colors }                from '../theme/Colors';
import EditButton                      from '../buttons/EditButton';

const propTypes = {
  roomcode: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,

  polls: PropTypes.object,
  order: PropTypes.object,

  onEditClick: PropTypes.func,
  onViewClick: PropTypes.func,
  onStatusButtonClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  roomTitle: 'Agenda',
  openPolls: [],
  pendingPolls: [],
  closedPolls: [],
};


const HostAgendaCard = ( props ) => {

  const { title, status, polls, order,
          onEditClick, onStatusClick, onViewClick,
          extraSmall, small, medium, large, extraLarge } = props;

  let allPolls = [];
  let statusList = ['open', 'pending', 'closed'];
  statusList = statusList.filter((status) => order[status] && order[status].length !== 0);

  for (let i = 0; i < statusList.length; i++) {
    allPolls = allPolls.concat(order[statusList[i]]) }

  const headerButton = (
    <EditButton type={'edit'} color={Colors.White} onClick={onEditClick}/>
  )

  return (
    <SecondaryCard  width={'100%'}
                    height={extraSmall ? `100%` : `stretch`}
                    header={title}
                    extraSmall={extraSmall} small={small}
                    medium={medium} large={large} extraLarge={extraLarge}
                    headerButton={status === 'closed' ? undefined : headerButton}>
      <Group>
        {allPolls.map((id) => {
          const poll = polls[id];
          return (
            <HostAgendaItem roomStatus={status}
                            pollTitle={poll.title}
                            status={poll.status}
                            onStatusClick={(newStatus) => onStatusClick(id, newStatus)}
                            onViewClick={onViewClick ? () => onViewClick(id) : undefined}/>
          )
        })}
      </Group>
    </SecondaryCard>

  )
};

HostAgendaCard.propTypes = propTypes;
HostAgendaCard.defaultProps = defaultProps;

export default HostAgendaCard;
