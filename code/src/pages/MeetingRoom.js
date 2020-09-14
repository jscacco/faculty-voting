import React                from 'react';
import styled               from 'styled-components';
import PollAgendaCard       from '../components/PollAgendaCard';

import { Colors }           from '../components/theme/Colors';
import history              from '../history'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

const User = () => {
  return <p>User</p>
}

class MeetingRoomScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {polls: []};
  }

  addPoll = () => {
    this.setState({
      polls: [...this.state.polls, <PollAgendaCard width={800}
                                                   type="Y/N"
                                                   title="Ammend wording on clause XYZ"
                                                   closed={true}
                                                   small={true} />]
    })
  }

  render() {


    return (
        <PageWrapper>
          {this.state.polls}
          <button onClick={this.addPoll}>Add Poll</button>
        </PageWrapper>
      );
  }
};

export default MeetingRoomScreen;
