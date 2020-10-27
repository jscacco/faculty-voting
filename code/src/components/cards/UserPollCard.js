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
import SubmitButton     from '../buttons/SubmitButton';


const UserPollCard = ( props ) => {

  const { pollData, userInput, submittedOptions, onOptionChange,
          onSubmit, submissionStatus, onInputChange,
          ...rest } = props;

  const _description = (
    <Body color={Colors.Charcol}>
      {pollData.description}
    </Body>
  )

  const _renderOptionGroup = () => {
    const optionComponents = pollData.optionsOrder.map(id => {

      const submitted = submittedOptions[id];

      return (
        <VotingOption id={id} submitted={submitted}>
          <TextOption>
            {pollData.options[id].value}
          </TextOption>
        </VotingOption>
      )
    });

    if ( pollData.userInputOption ) {
      console.log(userInput.id)
      const submitted = submittedOptions[userInput.id];
      optionComponents.push(
        <VotingOption id={userInput.id} submitted={submitted}>
          <InputOption value={userInput.value} onChange={onInputChange}/>
        </VotingOption>
      )
    }

    return (
      <OptionGroup type={pollData.type} fontColor={Colors.Black}
                   onSelect={onOptionChange} {...rest}>
        {optionComponents}
      </OptionGroup>
    );
  }

  const _submitButton = (
    <SubmitButton submissionStatus={submissionStatus}
                  onClick={onSubmit} {...rest}/>
  )

  const sections = [{content: _description},
                    {content: _renderOptionGroup()}]

  return (
    <TertiaryCard {...rest} width={`100%`} cardColor={Colors.White}
                   header={pollData.title} headerColor={Colors.Blue}
                   sections={sections} footer={_submitButton}/>
  )
};

export default UserPollCard;
