import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import UserAgendaCard        from '../components/cards/UserAgendaCard';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const HostDashPage = ( props ) => {

  const openPoll = { pollTitle: 'Poll', status:'open' ,}
  const pendingPoll = { pollTitle: 'Poll', status:'pending' , }
  const closedPoll = { pollTitle: 'Poll', status:'closed' ,}

  const openPolls=[openPoll,openPoll,openPoll]
  const closedPolls = [closedPoll]
  const pendingPolls = [pendingPoll,pendingPoll,pendingPoll,pendingPoll,pendingPoll]

  return (
    <ComponentWrapper>
      <UserAgendaCard medium openPolls={openPolls} pendingPolls={pendingPolls}
                    closedPolls={closedPolls}/>
    </ComponentWrapper>
  );

}

export default HostDashPage;
