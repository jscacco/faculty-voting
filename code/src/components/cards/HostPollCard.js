import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body            from '../theme/Body';

import TertiaryCard      from '../format-cards/TertiaryCard';
import OptionGroup      from '../option-groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption       from '../options/InputOption';
import VotingOption       from '../options/VotingOption';
import EditButton       from '../buttons/EditButton';
// import SubmitButton     from '../buttons/SubmitButton';


const HostPollCard = ( props ) => {

  const { pollData, onEditClick,
          ...rest } = props;

  const _description = (
    <Body color={Colors.Charcol}>
      {pollData.description}
    </Body>
  )

  const _renderOptionGroup = () => {
    const optionComponents = pollData.optionsOrder.map(id => {

      return (
        <TextOption>
          {pollData.options[id].value}
        </TextOption>
     )
    });

    if ( pollData.userInputOption ) {
      optionComponents.push(
        <InputOption/>
      )
    }

    return (
      <OptionGroup type={pollData.type} disabled fontColor={Colors.Black}
                  {...rest}>
        {optionComponents}
      </OptionGroup>
    );
  }

  const _editButton = <EditButton type={'edit'} color={Colors.Blue} onClick={onEditClick}/>


  const sections = [{content: _description},
                    {content: _renderOptionGroup()}]

  return (
    <TertiaryCard {...rest}
                   width={'100%'}
                   cardColor={Colors.White}
                   header={pollData.title}
                   headerColor={Colors.Blue}
                   headerButton={_editButton}
                   sections={sections} />
  )
};

export default HostPollCard;
