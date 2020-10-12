import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import UserAgendaCard       from '../components/cards/UserAgendaCard';

import { fetchAgenda }      from '../store/MockDataFunctions';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const UserAgendaPage = ( props ) => {

  const agenda = fetchAgenda()
  return (
    <ComponentWrapper>
      <UserAgendaCard medium openPolls={agenda.openPolls}
                             pendingPolls={agenda.pendingPolls}
                             closedPolls={agenda.closedPolls}/>
    </ComponentWrapper>
  );

}

export default UserAgendaPage;
