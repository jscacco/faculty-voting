import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostAgendaCard        from '../components/cards/HostAgendaCard';
import HostEditAgendaCard        from '../components/cards/HostEditAgendaCard';

import { fetchAgenda } from '../store/MockDataFunctions';
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

class HostAgendaPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = { isEditing: false }

    this.onEditClick = this.onEditClick.bind(this);
  }

  async onEditClick() {
    await this.setState({
      ...this.state,
      isEditing: !this.state.isEditing
    })
  }

  render() {

    const agenda = fetchAgenda();

    return(
      <PageWrapper>
        <DemoNavBar />
        <ComponentWrapper>
          { this.state.isEditing ?
            <HostEditAgendaCard medium openPolls={agenda.openPolls} pendingPolls={agenda.pendingPolls}
                          closedPolls={agenda.closedPolls} pendingOrder={agenda.pendingOrder}
                          onEditClick={this.onEditClick}/> :
            <HostAgendaCard medium openPolls={agenda.openPolls} pendingPolls={agenda.pendingPolls}
                          closedPolls={agenda.closedPolls} pendingOrder={agenda.pendingOrder}
                          onEditClick={this.onEditClick}/> }
        </ComponentWrapper>
      </PageWrapper>
    )
  }

}


// const HostAgendaPage = ( props ) => {
//
//   const agenda = fetchAgenda();
//
//   return (
//     <PageWrapper>
//       <DemoNavBar />
//       <ComponentWrapper>
//         <HostAgendaCard medium openPolls={agenda.openPolls}
//                                pendingPolls={agenda.pendingPolls}
//                                closedPolls={agenda.closedPolls}/>
//       </ComponentWrapper>
//     </PageWrapper>
//   );
//
// }

export default HostAgendaPage;
