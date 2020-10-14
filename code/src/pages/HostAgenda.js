import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { Colors }           from '../components/theme/Colors';

import HostAgendaCard        from '../components/cards/HostAgendaCard';
import HostEditAgendaCard        from '../components/cards/HostEditAgendaCard';

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const openPoll = { title: 'Poll ', status:'open' ,}
const pendingPoll = { title: 'Poll', status:'pending' , }
const closedPoll = { title: 'Poll', status:'closed' ,}

const openPolls=[openPoll,openPoll,openPoll]
const closedPolls = [closedPoll]
const pendingPolls = [{...pendingPoll, title: 'Poll 1'},{...pendingPoll, title: 'Poll 2'},
{...pendingPoll, title: 'Poll 3'},
{...pendingPoll, title: 'Poll 4'},
{...pendingPoll, title: 'Poll 5'}]

const pendingOrder = [0,1,2,3,4]

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
    return(
      <ComponentWrapper>
        { this.state.isEditing ?
          <HostEditAgendaCard medium openPolls={openPolls} pendingPolls={pendingPolls}
                        closedPolls={closedPolls} pendingOrder={pendingOrder}
                        onEditClick={this.onEditClick}/> :
          <HostAgendaCard medium openPolls={openPolls} pendingPolls={pendingPolls}
                        closedPolls={closedPolls} pendingOrder={pendingOrder}
                        onEditClick={this.onEditClick}/> }
      </ComponentWrapper>
    )
  }

}


// const HostDashPage = ( props ) => {
//
//   const openPoll = { title: 'Poll ', status:'open' ,}
//   const pendingPoll = { title: 'Poll', status:'pending' , }
//   const closedPoll = { title: 'Poll', status:'closed' ,}
//
//   const openPolls=[openPoll,openPoll,openPoll]
//   const closedPolls = [closedPoll]
//   const pendingPolls = [{...pendingPoll, title: 'Poll 1'},{...pendingPoll, title: 'Poll 2'},
//   {...pendingPoll, title: 'Poll 3'},
//   {...pendingPoll, title: 'Poll 4'},
//   {...pendingPoll, title: 'Poll 5'}]
//
//   const pendingOrder = [0,1,2,3,4]
//
//   return (
//     <ComponentWrapper>
//       <HostEditAgendaCard medium openPolls={openPolls} pendingPolls={pendingPolls}
//                     closedPolls={closedPolls} pendingOrder={pendingOrder}/>
//     </ComponentWrapper>
//   );
//
// }

export default HostAgendaPage;
