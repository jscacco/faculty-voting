import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostAgendaCard        from '../components/cards/HostAgendaCard';

import { fetchAgenda } from '../store/MockDataFunctions';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const HostAgendaPage = ( props ) => {

  const agenda = fetchAgenda();

  return (
    <ComponentWrapper>
      <HostAgendaCard medium openPolls={agenda.openPolls}
                             pendingPolls={agenda.pendingPolls}
                             closedPolls={agenda.closedPolls}/>
    </ComponentWrapper>
  );

}

export default HostAgendaPage;
