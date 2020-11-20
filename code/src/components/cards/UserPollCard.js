import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body            from '../theme/Body';

import TertiaryCard      from '../format-cards/TertiaryCard';
import OptionGroup      from '../groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption       from '../options/InputOption';
import VotingOption       from '../options/VotingOption';
import EditButton       from '../buttons/EditButton';
import SubmitButton     from '../buttons/SubmitButton';

const propTypes = {
  pollData: PropTypes.object,
  userInput: PropTypes.bool,
  submittedOptions: PropTypes.arrayOf(PropTypes.string),

  onOptionChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submissionStatus: PropTypes.string,
  onInputChange: PropTypes.func,
  submitLoading: PropTypes. bool,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool
}

const defaultProps = {

}

const UserPollCard = ( props ) => {

  const { pollData, userInput, submittedOptions, onOptionChange,
          onSubmit, submissionStatus, onInputChange,
          submitLoading,
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

  let submitButtonStatus = submissionStatus;
  if ( pollData.status === 'pending' ) { submitButtonStatus = 'pollpending'}
  else if (submitLoading) { submitButtonStatus = 'submitloading'}

  const _submitButton = (
    <SubmitButton submissionStatus={submitButtonStatus}
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

UserPollCard.propTypes = propTypes;
UserPollCard.defaultProps = defaultProps;

export default UserPollCard;
