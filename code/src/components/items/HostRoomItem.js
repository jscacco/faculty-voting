import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import Item             from './Item';
import Button           from '../buttons/Button';
import Body             from '../theme/Body';

const propTypes = {
  roomTitle: PropTypes.string,

  onViewClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  roomTitle: 'Room Title',
};


const HostRoomItem = ( props ) => {

  const { roomTitle, roomCode, onViewClick,
          ...rest } = props;

  const viewButton = (
    <Button {...rest} onClick={onViewClick}>
      VIEW
    </Button>
  )

  const roomCodeText = (
    <Body {...rest}>
      {roomCode}
    </Body>
  )


  return (
    <Item text={roomTitle} {...rest}>
      { roomCodeText }
      { viewButton }
    </Item >
  )

}

HostRoomItem.propTypes = propTypes;
HostRoomItem.defaultProps = defaultProps;

export default HostRoomItem;
