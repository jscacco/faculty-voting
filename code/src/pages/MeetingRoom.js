import React                from 'react';
import styled               from 'styled-components';

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

class MeetingRoomScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageWrapper>
        <p> meeting room screen </p>
      </PageWrapper>
    );
  }

};

export default MeetingRoomScreen;
