import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import AgendaItem         from './AgendaItem';
import Button           from '../buttons/Button';

const propTypes = {
  pollTitle: PropTypes.string,
  status: PropTypes.oneOf(['closed', 'open', 'pending']),

  onViewClick: PropTypes.func,
  onStatusButtonClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  pollTitle: 'Poll Title',
  status: 'pending'
};

const statusButtonConfig = {
  open: {
    text: 'CLOSE',
    color: Colors.Yellow,
  },
  closed:{
    text: 'CLOSED',
    color: Colors.Red,
  },
  pending:{
    text: 'OPEN',
    color: Colors.Green,
  }
}

const HostAgendaItem = ( props ) => {

  const {  status, onStatusClick,
          ...rest } = props;

  let config;
  let nextStatus;

  switch ( status ) {
    case 'open':
      config = statusButtonConfig.open;
      nextStatus = 'closed';
      break;
    case 'closed':
      config = statusButtonConfig.closed;
      nextStatus = 'closed';
      break;
    default:
      config = statusButtonConfig.pending;
      nextStatus = 'open';
  };

  const statusButton = status === 'closed' ?
    undefined :
    <Button {...rest} disabled={status === 'closed'} onClick={() => onStatusClick(nextStatus)}
            backgroundColor={config.color} textColor={Colors.White}>
      {config.text}
    </Button>


  return (
    <AgendaItem status={status} hostButton={statusButton} {...rest}/>
  )

}

HostAgendaItem.propTypes = propTypes;
HostAgendaItem.defaultProps = defaultProps;

export default HostAgendaItem;
