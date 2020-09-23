import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import {Jumbo}             from './theme/Jumbo';
import Text             from './theme/Text'

import OptionGroup      from './OptionGroup';
import Card             from './Card';
import Button           from './Button';

import AgendaItem       from './AgendaItem'

const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px`}
  ${({medium}) => medium && `padding-bottom: 26px`}
  ${({large}) => large && `padding-bottom: 32px`}
`;

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;


const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

class Agenda extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: [<AgendaItem width={600}/>]
    }
  }

  addPoll() { //poll) {
    this.setState({
      polls: [...this.state.polls, <AgendaItem width={600} />] // pollItem={poll} />]
    });
  }

  getState() {
    return this.state
  }

  render() {
    return (
      <Card width={750}>
        {this.state.polls}
      </Card>
    );
  }

};

export default Agenda;
