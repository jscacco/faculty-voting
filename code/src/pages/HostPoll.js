import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import HostPollCard         from '../components/cards/HostPollCard';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const HostPollPage = ( props ) => {

  const poll = 'Ammend Clause XYZ';

  return (
    <ComponentWrapper>
      <HostPollCard pollTitle={poll} />
    </ComponentWrapper>
  );

}

export default HostPollPage;
