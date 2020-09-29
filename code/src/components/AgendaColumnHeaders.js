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
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 20px;
`;

const BottomBorder = styled.div`
  borderBottom: "1px solid ${Colors.LightGrey}"
`;

const SpacingWrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 15px;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const renderTitle = (props) => {
  return (
    <Jumbo threeExtraSmall={true} color={Colors.LightBlue}>
      Poll Title
    </Jumbo>
  );
}

const renderStatus = (props) => {
  return (
    <Jumbo threeExtraSmall={true} color={Colors.LightBlue}>
      Status
    </Jumbo>
  );
}

const renderButton = (props) => {
  const { pollItem } = props;

  return (
    <Jumbo threeExtraSmall={true} color={Colors.LightBlue}>
      Action
    </Jumbo>
  );
}

const AgendaColumnHeaders = (props) => {

  const { width, small, medium, large,} = props;

  return (
    <SpacingWrapper>
      <SideBySideWrapper>
        {renderTitle(props)}
        {renderStatus(props)}
        {renderButton(props)}
      </SideBySideWrapper>
    </SpacingWrapper>
  )
};

export default AgendaColumnHeaders;
