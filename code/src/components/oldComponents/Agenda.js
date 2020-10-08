import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import {Jumbo}             from '../theme/Jumbo';
import Text             from '../theme/Text'

import OptionGroup      from '../options/OptionGroup';
import Card             from './Card';
import Button           from '../buttons/Button';
import PollItem         from '../PollItem';

import {code}               from '../../pages/RoomCode';

import { getAllPolls }   from '../../FirebaseUtil';

import AgendaItem       from '../listItems/AgendaItem';
import AgendaColumnHeaders from '../AgendaColumnHeaders';

const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px`}
  ${({medium}) => medium && `padding-bottom: 26px`}
  ${({large}) => large && `padding-bottom: 32px`}
`;

const AgendaWrapper = styled.div`
  background: ${Colors.White};
  position: relative;
  border-color: ${Colors.LightGrey};
  width: 100%;
`;

const Scroll = styled.div`
  overflow: scroll;
  position: absolute;
  height: calc(100vh - 75px);
  width: 100%;
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

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: .5
        }}
    />
);

const renderPolls = (props) => {
  const { polls } = props;

  var comps = []
  if(polls.constructor === Array) {
    comps = polls.map((poll) => {
      return (
        <>
          <ColoredLine color={Colors.LightGrey} />
          <AgendaItem pollItem={poll} width={600} />
        </>
      )
    })
  }

  return (
    <ComponentWrapper>
      {comps}
    </ComponentWrapper>
  )
}


const Agenda = (props) => {
  const { width, polls } = props;

  return (
    <AgendaWrapper>
      <AgendaColumnHeaders />
      <Scroll>
        {renderPolls(props)}
      </Scroll>
    </AgendaWrapper>
  )
};

export default Agenda;
