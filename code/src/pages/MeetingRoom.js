import React                from 'react';
import styled               from 'styled-components';

import { Colors }           from '../components/theme/Colors';
import history              from '../history';
import HostControlPanel     from '../components/HostControlPanel';
import Input            from '../components/inputs/Input'


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

    this.state = {
      options: [<Input placeholder={'Option'}/>, <Input placeholder={'Option'}/>]
    }
  }

  addOption = () => {
    this.setState({
      options: [...this.state.options, <Input placeholder={'Option'}/>]
    })
    console.log('Option added')
    console.log(this.state.options.length)
  }

  render() {
    return (
      <PageWrapper>
        <HostControlPanel width={300} title="Create a Poll" handleCreateOption={this.addOption} options={this.state.options} />
      </PageWrapper>
    );
  }

};

export default MeetingRoomScreen;
