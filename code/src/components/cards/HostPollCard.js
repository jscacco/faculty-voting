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
import EditButton       from '../buttons/EditButton';

import { fetchPollData } from '../../store/MockDataFunctions'

const HostHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  direction: row;
`;

const EditButtonWrapper = styled.div`
  position: relative;
  width: 10%;
`;


const HostPollCard = ( props ) => {

  const { pollTitle } = props;
  const pollData = fetchPollData(pollTitle);

  const headerButton = (
    <EditButton type={'edit'} color={Colors.Blue} onClick={props.onEditClick}/>
  )

  const _header = (
    <HostHeaderWrapper>
      <Jumbo twoExtraSmall color={Colors.LightBlue}>
        {pollData.title}
      </Jumbo>
      <EditButtonWrapper>
        {headerButton}
      </EditButtonWrapper>
    </HostHeaderWrapper>
  )

  const _description = (
    <Body small color={Colors.Charcol}>
      {pollData.description}
    </Body>
  )

  const _renderOptionGroup = () => {
    var optionComponents = pollData.options.map(optionData => {
      return optionData.optionType === 'text' ?
            <TextOption medium fontColor={Colors.LightBlue}>
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

export default HostPollCard;
