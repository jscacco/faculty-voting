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
import PollItem         from './PollItem';

import {code}               from '../pages/RoomCode';

import { getAllPolls }   from '../FirebaseUtil';

import AgendaItem       from './AgendaItem';

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

const renderPolls = (props) => {
  const { width, polls } = props;

  const agendaItems = polls.map((poll) => {
    return <AgendaItem width={width-50} pollItem={poll} />
  })

  return (
    <>
      {agendaItems}
    </>
  )
}

const Agenda = (props) => {
  const { width, polls } = props;

  return (
    <Card width={width}>
      {renderPolls(props)}
    </Card>
  )
};

export default Agenda;
