import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body            from '../theme/Body';

import PollCardBase     from './PollCardBase';
import OptionGroup      from '../option-groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption       from '../options/InputOption';
import Button           from '../buttons/Button';

import { fetchPollData } from '../../store/MockDataFunctions'

const UserHeaderWrapper = styled.div`
  display: flex;
  justify-content: left;
  direction: row;
`;


const UserPollCard = ( props ) => {

  const { pollTitle } = props;
  const pollData = fetchPollData(pollTitle);

  const _header = (
    <UserHeaderWrapper>
      <Jumbo twoExtraSmall color={Colors.White}>
        {pollData.title}
      </Jumbo>
    </UserHeaderWrapper>
  )

  const _description = (
    <Body small color={Colors.White}>
      {pollData.description}
    </Body>
  )

  const _renderOptionGroup = () => {
    var optionComponents = pollData.options.map(optionData => {
      return optionData.optionType === 'text' ?
            <TextOption medium fontColor={Colors.White}>
              {optionData.value}
            </TextOption> :
            <InputOption medium>
              {optionData.value}
            </InputOption>;
    });

    return (
      <OptionGroup>
        {optionComponents}
      </OptionGroup>
    );
  }

  const _renderButton = () => {
    var buttonText = "Submit";
    var buttonColor = Colors.Blue;
    var buttonTextColor = Colors.White

    return (
      <Button backgroundColor={buttonColor} textColor={buttonTextColor}>
        {buttonText}
      </Button>
    )
  }

  const _renderStatusText  = () => {
    var statusText = "Please submit your vote.";

    return (
      <Body small>
        {statusText}
      </Body>
    )
  }

  return (
    <PollCardBase header={_header}
                  description={_description}
                  optionGroup={_renderOptionGroup()}
                  button={_renderButton()}
                  statusText={_renderStatusText()}/>
  )
};

export default UserPollCard;
