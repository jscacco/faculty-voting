import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Jumbo             from '../theme/Jumbo';
import Text             from '../theme/Text'

import OptionGroup      from '../options/OptionGroup';
import Card             from './Card';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';
import CheckBox         from '../buttons/CheckBox';
import InputOption           from '../options/InputOption';
import Option           from '../options/Option';
import TextOption           from '../options/TextOption';


const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px;`}
  ${({medium}) => medium && `padding-bottom: 26px;`}
  ${({large}) => large && `padding-bottom: 32px;`}
  margin-bottom: 5px;
`;

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const SpacingWrapper = styled.div`
  position: relative;
  width: 20%;
  height: 40%;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ItemWrapper = styled.div`
  background: ${Colors.White};
  position: relative;
  margin-left: 15px;
  /* border-radius: 5px; */
  padding: 15px;
  border-color: ${Colors.LightGrey};
  border-bottom-style: solid;
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
          handleCreateOption, handleOptionChange, options }  = props;

  const optionComponents = options.map((item, index) => {
    return <InputOption placeholder={'Option ' + (index+1)}
                  onChange={(event) => handleOptionChange(event, index)} />
  })


  return (
      <ComponentWrapper small={small} medium={medium} large={large}>
        <Jumbo fiveExtraSmall color={Colors.Blue}>
          {'Enter Poll Options'}
        </Jumbo>
        <OptionGroup disabled small={small} medium={medium} large={large}>
         {optionComponents}
        </OptionGroup>
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
      <TextOption  buttonType={'checkbox'} small={small} medium={medium} large={large}>
        Do not show results
      </TextOption>
    </ComponentWrapper>
  )
};

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
    <ItemWrapper>
      {renderTitle(props)}
      {renderTitleInput(props)}
      {renderDescriptionInput(props)}
      {renderPollOptionsInput(props)}
      {renderResultViewingCheckbox(props)}
      {renderCreateButton(props)}
    </ItemWrapper>
  )
};

export default HostControlPanel;
