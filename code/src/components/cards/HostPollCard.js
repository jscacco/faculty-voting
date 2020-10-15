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

  const { pollData, onOptionChange, selectedOptions,
          onSubmit, buttonColor, buttonText, statusText } = props;

  const _headerButton = (
    <EditButton type={'edit'} color={Colors.Blue} onClick={props.onEditClick}/>
  )

  const _header = (
    <Jumbo twoExtraSmall color={Colors.Blue}>
      {pollData.title}
    </Jumbo>
  )

  const _description = (
    <DescriptionWrapper>
      <Body small color={Colors.Charcol}>
        {pollData.description}
      </Body>
    </DescriptionWrapper>
  )

  const _renderOptionGroup = () => {
    console.log(pollData.type)
    var optionComponents = pollData.options.map(optionData => {
      var iconType = pollData.type === 'multiple' ? 'checkbox' : 'bubble';
      console.log(iconType)
      return optionData.optionType === 'text' ?
            <VotingOption medium fontColor={Colors.LightBlue} type={iconType}>
              <Option >
                {optionData.value}
              </Option>
            </VotingOption> :
            <VotingOption medium fontColor={Colors.LightBlue} type={'iconType'}>
              <InputOption />
            </VotingOption>;
    });

    return (
      <OptionGroupWrapper>
        <OptionGroup type={pollData.type} onSelect={onOptionChange} selectedOptions={selectedOptions}>
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
