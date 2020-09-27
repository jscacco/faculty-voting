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
  const { polls } = props;

  console.log("Polls listed below")
  console.log(polls)
  console.log(polls.result)
}


const Agenda = (props) => {
  const { width, polls } = props;

  console.log('Agenda rendering...')
  console.log(polls)

  return (
    <Card width={width}>
      {renderPolls(props)}
    </Card>
  )
};

export default Agenda;
