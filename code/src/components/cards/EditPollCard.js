import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import OptionGroup      from '../option-groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption      from '../options/InputOption';
import AdderOption      from '../options/AdderOption';
import Option           from '../options/Option';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';
import InputField       from '../inputs/InputField';
import TextArea         from '../inputs/TextArea';
import EditingOption    from '../options/EditingOption';
import PrimaryCard      from '../format-cards/PrimaryCard';
import EditButton       from '../buttons/EditButton';
import EditingGroup     from '../groups/EditingGroup';
import AddItem          from '../items/AddItem';
import EditItem          from '../items/EditItem';


import HostEditPollOptionItem  from '../items/HostEditPollOptionItem';

import { fetchPollData } from '../../store/MockDataFunctions'

const ChildWrapper = styled.div`
  padding-top: 20px;
`;

const HeaderWrapper  = styled.div`
  width: 50%;
`;

const OptionsWrapper = styled.div`
  /* padding-left: 50%; */
`;

const AddOptionWrapper = styled.div`
  width: 150%;
`;

const OptionGroupWrapper = styled.div`
  padding-left: '1.5em';
  /* border: 1px solid black; */
`;

const LeftColumnWrapper = styled.div`
  width: 30%;
`;


const TwoColumnWrapper = styled.div`
  display: flex;
  direction: row;
  align-items: flex-start;
`;

const EditPollCard = ( props ) => {

  const { pollData } = props;
  const order = pollData.options.map((option) => {
    return option.order;
  })

  const _header = (
    <HeaderWrapper>
      <Body small color={Colors.LightBlue}>
        Title:
      </Body>
      <TextArea medium height={75}>
        {pollData.title}
      </TextArea>
    </HeaderWrapper>
  )

  const _headerButton = (
    <EditButton type={'save'} color={Colors.Blue} onClick={props.onEditClick}/>
  )

  const _description = (
    <>
      <Body small color={Colors.LightBlue}>
        Description:
      </Body>
      <Input medium>
        {pollData.description}
      </Input>
    </>
  )

  const _pollTypeSelection = (
    <>
      <Body small color={Colors.LightBlue}>
        Poll Type:
      </Body>
      <OptionGroup type={'single'}>
        <Option type={'bubble'}>
          Single Choice
        </Option>
        <Option type={'bubble'}>
          Multiple Choice
        </Option>
      </OptionGroup>
    </>
  )

  const AddComponent = ( props ) => {
    return (
      <AddItem textColor={Colors.White} iconColor={Colors.White}>
        Add new option
      </AddItem>
    )
}

  const _renderOptionGroup = () => {
    return (
      <ChildWrapper>
        <Body small color={Colors.LightBlue}>
          Options:
        </Body>
      </ChildWrapper>
      // <EditingGroup addItem={<AddComponent />}
      //               order={order}
      //               medium>
      //   {
      //     order.map((id) => {
      //       const option = pollData.options[id]
      //       console.log(option, id)
      //
      //       return (
      //         <HostEditPollOptionItem text={option.value}
      //                                 id={id} />
      //       )
      //     })
      //   }
      // </EditingGroup>
    )
  }

  const _additionalSettingsSection = (
    <ChildWrapper>
      <Body small color={Colors.LightBlue}>
        Additional Settings:
      </Body>
      <OptionGroup type={'multiple'}>
        <Option >
          Include write-in votes
        </Option>
        <Option >
          Make results public
        </Option>
      </OptionGroup>
    </ChildWrapper>
  )

  const _settingsSection = (
    <ChildWrapper>
      {_pollTypeSelection}
      {_additionalSettingsSection}
    </ChildWrapper>
  )

  const _settingsOptionColumnGroup = (
    <TwoColumnWrapper>
      <LeftColumnWrapper>
        {_settingsSection}
      </LeftColumnWrapper>
        {_renderOptionGroup()}
    </TwoColumnWrapper>
  )

  const _children = (
    <>
      {_description}
      {_settingsOptionColumnGroup}
    </>
  )

  return (
    <PrimaryCard extraSmall cardColor={Colors.White}
                 header={_header} headerButton={_headerButton}
                 children={_children}/>
  )
};

export default EditPollCard;
