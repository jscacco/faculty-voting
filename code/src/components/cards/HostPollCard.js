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

import MockDataFunctions from '../../store/MockDataFunctions';

const HostHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  direction: row;
`;

const EditButtonWrapper = styled.div`
  position: relative;
  width: 10%;
`;

const fetchPollData = (pollTitle) => {
  return {
    title: pollTitle,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum egestas nulla non accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur nunc nisl, condimentum scelerisque dignissim sed, mattis in est. Nullam eu sem ultrices, consequat velit eget, fringilla justo. Mauris quis sodales purus, eu sollicitudin risus. Etiam malesuada risus a nibh facilisis volutpat. Praesent a bibendum mi, gravida pulvinar mauris. In hac habitasse platea dictumst. retium ligula at tincidunt. Suspendisse accumsan magna consequat dolor porttitor vestibulum vitae sed enim. Pellentesque ut viverra odio, non suscipit felis. Mauris elit nisl, luctus nec fermentum quis, interdum nec ligula.",
    options: [
      {value: "Option 1", count: 0, optionType: 'text', order: 0},
      {value: "Option 2", count: 0, optionType: 'text', order: 1},
      {value: "Option 3", count: 0, optionType: 'input', order: 2}
    ]
  }
}


const HostPollCard = ( props ) => {

  const { pollTitle } = props;
  const pollData = fetchPollData(pollTitle);

  const _header = (
    <HostHeaderWrapper>
      <Jumbo twoExtraSmall color={Colors.White}>
        {pollData.title}
      </Jumbo>
      <EditButtonWrapper>
        <Button medium backgroundColor={Colors.LightGrey} textColor={Colors.Charcol}>
          Edit
        </Button>
      </EditButtonWrapper>
    </HostHeaderWrapper>
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

export default HostPollCard;
