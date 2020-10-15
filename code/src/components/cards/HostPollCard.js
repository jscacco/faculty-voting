import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body            from '../theme/Body';

import PrimaryCard      from '../format-cards/PrimaryCard';
import OptionGroup      from '../option-groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption       from '../options/InputOption';
import Button           from '../buttons/Button';
import EditButton       from '../buttons/EditButton';

import { fetchPollData } from '../../store/MockDataFunctions'

const propTypes = {
  onEditClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const ButtonStatusStackWrapper =  styled.div`
  padding: 15px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
`;

const DescriptionWrapper = styled.div`
  padding: 10px;
`;

const OptionGroupWrapper = styled.div`
  padding: 20px;
`;

const StatusWrapper = styled.div`
  padding-top: 0px;
  display: flex;
  justify-content: center;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HostPollCard = ( props ) => {

  const { pollTitle } = props;
  const pollData = fetchPollData(pollTitle);

  const _headerButton = (
    <EditButton type={'edit'} color={Colors.Blue} onClick={(props.onEditClick)}/>
  )

  const _header = pollData.title;

  const _description = (
    <DescriptionWrapper>
      <Body small color={Colors.Charcol}>
        {pollData.description}
      </Body>
    </DescriptionWrapper>
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
      <OptionGroupWrapper>
        <OptionGroup>
          {optionComponents}
        </OptionGroup>
      </OptionGroupWrapper>
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

  const _renderStatusText = () => {
    var statusText = "Please submit your vote.";

    return (
      <StatusWrapper>
        <Body small>
          {statusText}
        </Body>
      </StatusWrapper>
    )
  }

  const _buttonStatusStack = (
    <CenterWrapper>
      <ButtonStatusStackWrapper>
        {_renderButton()}
        {_renderStatusText()}
      </ButtonStatusStackWrapper>
    </CenterWrapper>
  )

  const _children = () => {
    return (
      <>
        {_description}
        {_renderOptionGroup()}
        {_buttonStatusStack}
      </>
    )
  }

  return (
    <PrimaryCard extraSmall cardColor={Colors.White}
                 header={_header} headerButton={_headerButton}
                 children={_children()} />
  )
};

HostPollCard.propTypes = propTypes;

export default HostPollCard;
