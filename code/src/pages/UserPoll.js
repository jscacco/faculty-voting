import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import UserPollCard         from '../components/cards/UserPollCard';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const UserPollPage = ( props ) => {

  const poll = 'Ammend Clause XYZ';

  return (
    <ComponentWrapper>
      <UserPollCard pollTitle={poll} />
    </ComponentWrapper>
  );

}

export default UserPollPage;
