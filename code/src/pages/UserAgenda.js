import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import UserAgendaCard       from '../components/cards/UserAgendaCard';

import { fetchAgenda }      from '../store/MockDataFunctions';
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

const PageWrapper = styled.div`
  background-color: ${Colors.White};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  position: fixed;
  overflow: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const UserAgendaPage = ( props ) => {

  const agenda = fetchAgenda()
  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <UserAgendaCard medium openPolls={agenda.openPolls}
                               pendingPolls={agenda.pendingPolls}
                               closedPolls={agenda.closedPolls}/>
      </ComponentWrapper>
    </PageWrapper>
  );

}

export default UserAgendaPage;
