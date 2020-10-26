import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import SecondaryCard            from '../format-cards/SecondaryCard';
import AgendaItem                from '../items/AgendaItem';
import Group                 from '../groups/Group';

const propTypes = {
  roomcode: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.string,

  polls: PropTypes.object,
  order: PropTypes.object,

  onViewClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {

};


const UserAgendaCard = ( props ) => {

  const { roomcode, title, status, polls, order, onViewClick,
          extraSmall, small, medium, large, extraLarge } = props;

  let allPolls = [];
  let statusList = ['open', 'pending', 'closed'];
  statusList = statusList.filter((status) => order[status] && order[status].length != 0);

  for (let i = 0; i < statusList.length; i++) {
    allPolls = allPolls.concat(order[statusList[i]]) }

  return (
    <SecondaryCard header={title} width={`100%`}
                   extraSmall={extraSmall} small={small}
                   medium={medium} large={large} extraLarge={extraLarge}>
      <Group>
        {allPolls.map((id) => {
          const poll = polls[id];
          return (
            <AgendaItem pollTitle={poll.title}
                        status={poll.status}
                        onViewClick={onViewClick ? () => onViewClick(id) : undefined}/>
          )
        })}
      </Group>
    </SecondaryCard>
  )
};

UserAgendaCard.propTypes = propTypes;
UserAgendaCard.defaultProps = defaultProps;

export default UserAgendaCard;
