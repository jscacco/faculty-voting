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
  justify-content: flex-start;
`;


const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const renderTitle = (props) => {
  const { title, small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Jumbo threeExtraSmall color={Colors.Blue}>
        {title}
      </Jumbo>
    </ComponentWrapper>
  )
};

const renderTitleInput = props => {
  const { small, medium, large,
          handleTitleChange } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Input placeholder={'Enter poll title'}
             onChange={handleTitleChange}/>
    </ComponentWrapper>
  )
};

const renderDescriptionInput = props => {
  const { small, medium, large,
          handleDescriptionChange } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Input type={'textarea'} placeholder={'Enter poll description'}
             onChange={handleDescriptionChange}/>
    </ComponentWrapper>
  )
};

const renderPollOptionsInput = props => {
  const { small, medium, large,
          handleCreateOption, options }  = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Jumbo fiveExtraSmall color={Colors.Blue}>
        {'Enter Poll Options'}
      </Jumbo>
      {options}
      <CenterWrapper>
        <Button small={small} medium={small} large={small}
                width={150} onClick={handleCreateOption}>
          {'Add Option'}
        </Button>
      </CenterWrapper>
    </ComponentWrapper>
  )
};

const renderResultViewingCheckbox = props => {
  const { small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <SideBySideWrapper>
        <Option  buttonType={'checkbox'} />
        <Text> Do not show results </Text>
      </SideBySideWrapper>
    </ComponentWrapper>
  )
};

function handleCreatPoll(props) {

}

const renderCreateButton = props => {
  const { small, medium, large,
          handleSubmit } = props;

  return (
    <ComponentWrapper>
      <CenterWrapper>
        <Button small={small} medium={medium} large={large}
                width={150} onClick={handleSubmit}>
          {'Create Poll'}
        </Button>
      </CenterWrapper>
    </ComponentWrapper>
  )
};

const HostControlPanel = (props) => {

  const { width, title, small, medium, large, options,
          handleSubmit, handleCreateOption,
          handleTitleChange, handleDescriptionChange } = props;

  return (
    <Card width={width}>
      {renderTitle(props)}
      {renderTitleInput(props)}
      {renderDescriptionInput(props)}
      {renderPollOptionsInput(props)}
      {renderResultViewingCheckbox(props)}
      {renderCreateButton(props)}
    </Card>
  )
};

export default HostControlPanel;
