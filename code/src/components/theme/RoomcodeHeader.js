import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from './Colors';
import Jumbo            from './Jumbo';

const propTypes = {
  roomcode: PropTypes.number,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
}

const defaultProps = {};

const ComponentWrapper = styled.div`
  padding-top: 2vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RoomcodeHeader = ( props ) => {

  const { roomcode,
          extraSmall, small, medium, large, extraLarge } = props;

  return (
    <ComponentWrapper>
      <Jumbo color={Colors.White}
             fiveExtraSmall={extraSmall} fourExtraSmall={small}
             threeExtraSmall={medium} twoExtraSmall={large}
             extraSmall={extraLarge}>
        {`Room Code: ${roomcode}`}
      </Jumbo>
    </ComponentWrapper>
  )
};

RoomcodeHeader.propTypes = propTypes;
RoomcodeHeader.defaultProps = defaultProps;

export default RoomcodeHeader;
