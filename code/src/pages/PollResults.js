import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import PollResultsCard         from '../components/cards/PollResultsCard';

import { fetchPollData } from '../store/MockDataFunctions'
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

class PollResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: fetchPollData('0002', '02'),
    }
  }

  render() {
    return (
      <PageWrapper>
        <DemoNavBar />
        <ComponentWrapper>
          <PollResultsCard pollData={this.state.poll}/>
        </ComponentWrapper>
      </PageWrapper>
    );
  }
}

export default PollResultsPage;

/*

*/
