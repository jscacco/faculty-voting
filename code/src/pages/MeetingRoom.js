import React                from 'react';
import styled               from 'styled-components';
import PollAgendaCard       from '../components/PollAgendaCard';

import { Colors }           from '../components/theme/Colors';
import history              from '../history'

import Button               from '../components/Button'

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const AgendaWrapper = styled.div`
  margin: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0%);
`;

class MeetingRoomScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {polls: []};
  }

  addPoll = () => {
    this.setState({
      polls: [...this.state.polls, <PollAgendaCard width={800}
                                                   height={10}
                                                   type="Y/N"
                                                   title="Ammend wording on clause XYZ"
                                                   closed={true}
                                                   small={true} />, <PollAgendaCard width={800}
                                                                                                height={10}
                                                                                                type="Y/N"
                                                                                                title="Clause XYZ"
                                                                                                closed={true}
                                                                                                small={true} />]
    })
  }

  render() {


    return (
        <PageWrapper>
          <AgendaWrapper>
            {this.state.polls}
            <CenterWrapper>
              <Button small={true} onClick={this.addPoll}>
                ADD POLL
              </Button>
            </CenterWrapper>
          </AgendaWrapper>
        </PageWrapper>
      );
  }
};

export default MeetingRoomScreen;
