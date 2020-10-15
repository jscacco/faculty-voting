import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import PrimaryCard      from '../format-cards/PrimaryCard'
// import AgendaCardBase            from './AgendaCardBase';
import HostAgendaItem                from '../items/HostAgendaItem';
import Group                 from '../groups/Group'

import { Colors }                from '../theme/Colors';
import EditButton                      from '../buttons/EditButton';

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
  closedPolls: [],
};


const HostAgendaCard = ( props ) => {

  const { roomTitle, openPolls, pendingPolls, closedPolls,
          onViewClick, onStatusButtonClick,
          extraSmall, small, medium, large, extraLarge } = props;


  const allPolls = openPolls.concat(pendingPolls, closedPolls);
  const pollComponents = (
    <Group>
      { allPolls.map((poll, index) => (
        <HostAgendaItem key={`${index}`}
                        pollTitle={poll.title} status={poll.status}
                        onViewClick={onViewClick ? () => onViewClick(index) : undefined}
                        onStatusButtonClick={onStatusButtonClick ? () => onStatusButtonClick(index) : undefined}/>
      )) }
    </Group>
  )

  const headerButton = (
    <EditButton type={'edit'} color={Colors.White} onClick={props.onEditClick}/>
  )

  return (
    <PrimaryCard header={roomTitle} children={pollComponents}
                    extraSmall={extraSmall} small={small}
                    medium={medium} large={large} extraLarge={extraLarge}
                    headerButton={headerButton}/>
  )
};

HostAgendaCard.propTypes = propTypes;
HostAgendaCard.defaultProps = defaultProps;

export default HostAgendaCard;
