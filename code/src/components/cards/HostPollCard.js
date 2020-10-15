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
import Option       from '../options/Option';
import VotingOption       from '../options/VotingOption';
import InputOption       from '../options/InputOption';
import Button           from '../buttons/Button';
import EditButton       from '../buttons/EditButton';

const ButtonStatusStackWrapper =  styled.div`
  padding: 15px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 150px;
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
  text-align: center;
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HostPollCard = ( props ) => {

  const { pollData, onOptionChange,
          onSubmit, buttonColor, buttonText, statusText } = props;

  const _headerButton = (
    <EditButton type={'edit'} color={Colors.Blue} onClick={props.onEditClick}/>
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
            <VotingOption medium fontColor={Colors.LightBlue}>
              <TextOption>
                {optionData.value}
              </TextOption>
            </VotingOption> :
            <VotingOption medium>
              <InputOption>
                {optionData.value}
              </InputOption>
            </VotingOption>;
    });

    return (
      <OptionGroupWrapper>
        <OptionGroup onSelect={onOptionChange}>
          {optionComponents}
        </OptionGroup>
      </OptionGroupWrapper>
    );
  }

  const _renderButton = () => {

    return (
      <Button backgroundColor={buttonColor} textColor={Colors.White} onClick={onSubmit}>
        {buttonText}
      </Button>
    )
  }

  const _renderStatusText = () => {
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

export default HostPollCard;
