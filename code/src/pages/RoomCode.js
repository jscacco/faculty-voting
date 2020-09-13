import React    from 'react';
import styled   from 'styled-components';

import { Colors } from '../components/theme/Colors';
import RoomCodeForm from '../components/RoomCodeForm';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

const RoomCodeScreen = (props) => {

  return(
    <PageWrapper>
      <RoomCodeForm/>

    </PageWrapper>
  )

};

export default RoomCodeScreen;
