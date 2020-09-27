import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import Jumbo             from './theme/Jumbo';
import Text             from './theme/Text'

import OptionGroup      from './OptionGroup';
import Card             from './Card';
import Button           from './Button';
import Input            from '../components/inputs/Input'
import TextArea            from '../components/inputs/TextArea'
import CheckBox         from './buttons/CheckBox'
import Option           from './options/Option'


const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px`}
  ${({medium}) => medium && `padding-bottom: 26px`}
  ${({large}) => large && `padding-bottom: 32px`}
`;

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const renderTitle = (props) => {
  const { pollItem } = props;

  return (
    <Jumbo fiveExtraSmall={true} color={Colors.White}>
      {pollItem.title}
    </Jumbo>
  );
}

const renderStatus = (props) => {
  const { pollItem } = props;

  return (
    <Jumbo fiveExtraSmall={true} color={Colors.White}>
      {pollItem.status}
    </Jumbo>
  );
}

const renderButton = (props) => {
  const { pollItem } = props;

  return (
    <Button extraSmall={true}>
      Vote
    </Button>
  );
}

const AgendaItem = (props) => {

  const { width, small, medium, large,
          pollItem } = props;

  return (
    <Card width={width} color={Colors.LightBlue}>
      <SideBySideWrapper>
        {renderTitle(props)}
        {renderStatus(props)}
        {renderButton(props)}
      </SideBySideWrapper>
    </Card>
  )
};

export default AgendaItem;
