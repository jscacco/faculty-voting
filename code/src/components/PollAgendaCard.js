import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import {Jumbo}             from './theme/Jumbo';

import OptionGroup      from './OptionGroup';
import Card             from './Card';
import Button           from './Button';

const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px`}
  ${({medium}) => medium && `padding-bottom: 26px`}
  ${({large}) => large && `padding-bottom: 32px`}
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const renderType = (props) => {

  const { type, small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Body small={small} medium={medium}
            large={large} color={Colors.Black}>
        {type}
      </Body>
    </ComponentWrapper>
  )
};

const renderTitle = (props) => {
  const { title, small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Body small={small} medium={medium}
            large={large} color={Colors.Black}>
        {title}
      </Body>
    </ComponentWrapper>
  )
};

const renderStatus = (props) => {
  const { pending, open, closed, small, medium, large } = props;

  let text;
  let color;
  if (pending) {
    text = 'Pending';
  }
  else if (open) {
    text='Open';
  }
  else if (closed) {
    text = 'Closed';
  }
  else {
    text='ERROR';
  };

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Body small={small} medium={medium}
            large={large} color={Colors.Black}>
        {text}
      </Body>
    </ComponentWrapper>
  )
};

const renderButton = (props) => {
  const { small, medium, large,
          handleSubmit, pending, open, closed } = props;

  let width;

  if (large) { width = 175}
  else if ( small ) { width = 125 }
  else { width = 150 }

  let text;
  let color;
  if (pending) {
    text = 'Preview';
    color = Colors.Charcol;
  }
  else if (open) {
    text='Vote';
    color = Colors.Green;
  }
  else if (closed) {
    text = 'See Results';
    color = Colors.LightBlue;
  }
  else {
    text='ERROR';
    color = Colors.Red;
  };

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Button onClick={handleSubmit} disabled={pending}
              small={small} medium={medium} large={large}
              width={width} backgroundColor={color}>
        {text}
      </Button>
    </ComponentWrapper>
  )

};

const PollAgendaCard = (props) => {

  const { width, type, title, status } = props;

  return (
    <Card width={width}>
      <CenterWrapper>
        {renderType(props)}
        {renderTitle(props)}
        {renderStatus(props)}
        {renderButton(props)}
      </CenterWrapper>
    </Card>
  )

};

export default PollAgendaCard;
