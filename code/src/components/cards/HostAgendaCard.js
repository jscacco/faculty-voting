import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import AgendaCardBase            from './AgendaCardBase';
import HostAgendaItem                from '../items/HostAgendaItem';
import ItemGroup                 from '../item-groups/ItemGroup'

const propTypes = {

  roomTitle: PropTypes.string,

  openPolls: PropTypes.arrayOf(PropTypes.object),
  pendingPolls: PropTypes.arrayOf(PropTypes.object),
  closedPolls: PropTypes.arrayOf(PropTypes.object),

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
  closedPolls: []
};

const HostAgendaCard = ( props ) => {

  const { roomTitle, openPolls, pendingPolls, closedPolls,
          onViewClick, onStatusButtonClick,
          extraSmall, small, medium, large, extraLarge } = props;


  const allPolls = openPolls.concat(pendingPolls, closedPolls);
  const pollComponents = (
    <ItemGroup>
      { allPolls.map((poll, index) => (
        <HostAgendaItem pollTitle={poll.title} status={poll.status}
                        onViewClick={onViewClick ? () => onViewClick(index) : undefined}
                        onStatusButtonClick={onStatusButtonClick ? () => onStatusButtonClick(index) : undefined}/>
      )) }
    </ItemGroup>
  )

  return (
    <AgendaCardBase header={roomTitle} pollComponents={pollComponents}
                    extraSmall={extraSmall} small={small}
                    medium={medium} large={large} extraLarge={extraLarge}/>
  )
};

HostAgendaCard.propTypes = propTypes;
HostAgendaCard.defaultProps = defaultProps;

export default HostAgendaCard;
