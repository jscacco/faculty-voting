import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import HostPollCard         from '../components/cards/HostPollCard';
import EditPollCard         from '../components/cards/EditPollCard';

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

class HostPollPage extends React.Component {

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
    const poll = 'Ammend Clause XYZ';

    return (
      <PageWrapper>
        <DemoNavBar />
        <ComponentWrapper>
          { this.state.isEditing ?
            <EditPollCard pollTitle={poll} onEditClick={this.onEditClick}/> :
            <HostPollCard pollTitle={poll} onEditClick={this.onEditClick}/>
          }
        </ComponentWrapper>
      </PageWrapper>
    );
  }
}

export default HostPollPage;
