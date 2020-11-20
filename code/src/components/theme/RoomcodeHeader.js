import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './Colors';
import Body             from './Body';
import Jumbo            from './Jumbo';
import logo     from './logo.png';

const ComponentWrapper = styled.div`
  /* width: 100%; */
  padding-top: 2vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageHeader = ( props ) => {

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


export default PageHeader;
