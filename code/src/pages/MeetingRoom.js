import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import history              from '../history';
import HostControlPanel     from '../components/HostControlPanel';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;

class MeetingRoomScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageWrapper>
        <HostControlPanel width={300} title="Create a Poll" />

      </PageWrapper>
    );
  }

};

export default MeetingRoomScreen;
