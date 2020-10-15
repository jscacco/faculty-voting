import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import SecondaryCard            from '../format-cards/SecondaryCard';
import AgendaItem                from '../items/AgendaItem';
import Group                 from '../groups/Group';

const propTypes = {

  roomTitle: PropTypes.string,

  openPolls: PropTypes.arrayOf(PropTypes.object),
  pendingPolls: PropTypes.arrayOf(PropTypes.object),
  closedPolls: PropTypes.arrayOf(PropTypes.object),

  onViewClick: PropTypes.func,

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
  closedPolls: []
};


const UserAgendaCard = ( props ) => {

  const { roomTitle, openPolls, pendingPolls, closedPolls, onViewClick,
          extraSmall, small, medium, large, extraLarge } = props;


  const allPolls = openPolls.concat(pendingPolls, closedPolls);
  const pollComponents = (
    <Group>
      { allPolls.map((poll, index) => (
        <AgendaItem pollTitle={poll.title} status={poll.status}
                    onViewClick={onViewClick ? () => onViewClick(index): undefined}/>
      )) }
    </Group>
  )

  return (
    <SecondaryCard header={roomTitle}
                 extraSmall={extraSmall} small={small}
                 medium={medium} large={large} extraLarge={extraLarge}>
      {pollComponents}
    </SecondaryCard>
  )
};

UserAgendaCard.propTypes = propTypes;
UserAgendaCard.defaultProps = defaultProps;

export default UserAgendaCard;
