import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';

import StatusText       from '../format/StatusText';

import Card             from '../cards/Card';
import Button           from '../buttons/Button';

const propTypes = {
  text: PropTypes.string,
  status: PropTypes.oneOf(['closed', 'open', 'pending']),

  poll: PropTypes.boolean,

  onViewClick: PropTypes.func,
  onLaunchClick: PropTypes.func,
};

const ComponentWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextWrapper = styled.div `
  width: 100%;
`;

const StatusWrapper = styled.div`
  padding-right: 10px;
`;

const ButtonWrapper = styled.div`
  display: inline-block;
  ${({padding}) => padding ? `padding-right: 10px;` : ``}
`;

const itemText = ( props ) => {

  const { text, small, medium, large } = props;

  return (
    <TextWrapper>
      <Body small={small} medium={medium} large={large}>
        {text}
      </Body>
    </TextWrapper>
  )
}

const controlButton = ( props ) => {

  const { status, onLaunchClick, small, medium, large } = props;

  let color;
  let text;
  let disabled = false;

  switch (status) {
    case 'open':
      color = Colors.Yellow;
      text = 'CLOSE';
      break;
    case 'closed':
      color = Colors.Red;
      text = 'CLOSED';
      disabled = true;
      break;
    default:
      color = Colors.Green;
      text = 'ACTIVATE';
  }

  return (
  <ButtonWrapper padding>
    <Button small={small} medium={medium} large={large} backgroundColor={color}
            onClick={onLaunchClick} disabled={disabled}>
      {text}
    </Button>
  </ButtonWrapper>
)}

const viewButton = ( props ) => {

  const { onViewClick, small, medium, large } = props

  return (
  <ButtonWrapper>
    <Button onClick={onViewClick} small={small} medium={medium} large={large}>
      VIEW
    </Button>
  </ButtonWrapper>
  );
}

const status = ( props ) => {

  const { status, small, medium, large } = props;

  return (
    <StatusWrapper>
      <StatusText status={status} small={small} medium={medium} large={large}/>
    </StatusWrapper>
  )
}

const HostBaseItem = ( props ) => {

  const { poll } = props;

  console.log(poll);

  return (
    <Card padding={10} borderRadius={5}>
      <ComponentWrapper>
        {itemText(props)}
        {poll ? status(props) : null}
        {controlButton(props)}
        {viewButton(props)}
      </ComponentWrapper>
    </Card>
  )

}

export default HostBaseItem;
