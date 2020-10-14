import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import Item         from './Item';
import StatusText       from '../format-text/StatusText';

import Button           from '../buttons/Button';

const propTypes = {
  pollTitle: PropTypes.string,
  status: PropTypes.oneOf(['closed', 'open', 'pending']),

  onViewClick: PropTypes.func,
  hostButton: PropTypes.node,

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


const AgendaItem = ( props ) => {

  const { pollTitle, status, onViewClick, hostButton,
          ...rest } = props;

  const statusText = <StatusText status={status} {...rest}/>

  const viewButton = (
    <Button {...rest} onClick={onViewClick}>
      VIEW
    </Button>
  )

  if ( hostButton ){
    return (
      <Item text={pollTitle} {...rest}>
        { statusText }
        { hostButton }
        { viewButton }
      </Item>
    )
  }

  return (
    <Item text={pollTitle} {...rest}>
      { statusText }
      { viewButton }
    </Item>
  )

}

AgendaItem.propTypes = propTypes;
AgendaItem.defaultProps = defaultProps;

export default AgendaItem;
