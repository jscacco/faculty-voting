import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Jumbo             from '../theme/Jumbo';
import Text             from '../theme/Text'

// import OptionGroup      from './OptionGroup';
// import Card             from './Card';
import Button           from '../buttons/Button';
// import Input            from '../components/inputs/Input'
// import TextArea            from '../components/inputs/TextArea'
// import CheckBox         from './buttons/CheckBox'
// import Option           from './options/Option'



const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px`}
  ${({medium}) => medium && `padding-bottom: 26px`}
  ${({large}) => large && `padding-bottom: 32px`}
`;

const SideBySideWrapper = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
`;

const BottomBorder = styled.div`
  borderBottom: "1px solid ${Colors.LightGrey}"
`;

const SpacingWrapper = styled.div`
  position: relative;
  width: 80%;
  margin-bottom: 15px;
  margin-left:15px;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 1%;
  transform: translate(0%, -50%);
  height: 5%;
`;

const StatusWrapper = styled.div``;

const PendingCircle = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${Colors.LightGrey};
  border-radius: 50%;
  display: inline-block;
  margin-right:10px;
`;

const OpenCircle = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${Colors.Green};
  border-radius: 50%;
  display: inline-block;
  margin-right:10px;
`;

const ClosedCircle = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${Colors.Red};
  border-radius: 50%;
  display: inline-block;
  margin-right:10px;
`;

const renderTitle = (props) => {
  const { pollItem } = props;

  return (
      <Body medium={true} color={Colors.Charcol}>
        {pollItem.title}
      </Body>
  );
}

const renderStatus = (props) => {
  const { pollItem, small, medium, large } = props;

  var circle = (<PendingCircle/>)

  if (pollItem.status == 'open') {
    circle = (<OpenCircle/>)
  } else if (pollItem.status == 'closed') {
    circle = (<ClosedCircle/>)
  }

  return (
    <StatusWrapper>
      <Body small={small} medium={medium} large={large} color={Colors.Charcol}>
        {circle}
        {pollItem.status}
      </Body>
    </StatusWrapper>
  );
}

const renderButton = (props) => {
  const { small, medium, large } = props;

  return (
    <Button small={small} medium={medium} large={large}>
      Vote
    </Button>
  );
}

const AgendaItem = (props) => {

  const { width, small, medium, large,
          pollItem } = props;

  return (
    <SpacingWrapper>
        <SideBySideWrapper>
          <BottomBorder>
            {renderTitle(props)}
          </BottomBorder>
            {renderStatus(props)}
            {renderButton(props)}
        </SideBySideWrapper>
    </SpacingWrapper>
  )
};

export default AgendaItem;
