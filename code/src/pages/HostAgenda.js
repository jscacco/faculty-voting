import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostAgendaCard        from '../components/cards/HostAgendaCard';

import { fetchAgenda } from '../store/MockDataFunctions';
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
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

const HostAgendaPage = ( props ) => {

  const agenda = fetchAgenda();

  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <HostAgendaCard medium openPolls={agenda.openPolls}
                               pendingPolls={agenda.pendingPolls}
                               closedPolls={agenda.closedPolls}/>
      </ComponentWrapper>
    </PageWrapper>
  );

}

export default HostAgendaPage;
