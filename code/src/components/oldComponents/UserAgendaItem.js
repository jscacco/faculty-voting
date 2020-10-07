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
  pollTitle: PropTypes.string,
  status: PropTypes.oneOf(['closed', 'open', 'pending']),

  onViewClick: PropTypes.func,
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


  return (
    <Card padding={10} borderRadius={5}>
      <ComponentWrapper>
        {itemText(props)}
        {status(props)}
        {viewButton(props)}
      </ComponentWrapper>
    </Card>
  )

}

export default HostBaseItem;
