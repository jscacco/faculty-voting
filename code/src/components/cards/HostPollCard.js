import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from '../theme/Colors';
import Body            from '../theme/Body';

import TertiaryCard      from '../format-cards/TertiaryCard';
import OptionGroup      from '../groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption       from '../options/InputOption';
import EditButton       from '../buttons/EditButton';
import SubmitButton     from '../buttons/SubmitButton';


const propTypes = {
  pollData: PropTypes.object,
  onEditClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  pollData: {},
  onEditClick: undefined,
};


const DescriptionWrapper = styled.div`
  ${({padding}) => padding && `padding-bottom: ${padding}px;`}
`;

const PollComponent = ( props ) => {
  const { pollData, onEditClick, ...rest } = props;

  let padding;
  if (props.extraSmall) { padding = 14}
  else if (props.small) { padding = 16}
  else if (props.large) { padding = 28}
  else if (props.extraLarge) { padding = 32}
  else { padding = 22}

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

  return (
    <PollComponent>
      <DescriptionWrapper padding={padding}>
        {_description}
      </DescriptionWrapper>
      {_renderOptionGroup()}
    </PollComponent>
  )
}

const HostPollCard = ( props ) => {

  const { pollData, onEditClick,
          ...rest } = props;

  const _editButton = <EditButton type={'edit'} color={Colors.Blue} onClick={onEditClick}/>

  const _submitButton = (
    <SubmitButton submissionStatus={'unselected'}
                  {...rest}/>
  )

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

  const sections = [{content: _description},
                    {content: _renderOptionGroup()}]

  return (
    <TertiaryCard {...rest}
                   width={'100%'}
                   height={props.extraSmall ? `100%` : `stretch`}
                   cardColor={Colors.White}
                   header={pollData.title}
                   headerColor={Colors.Blue}
                   headerButton={pollData.status === 'open' ? undefined : _editButton}
                   sections={sections}
                   footer={_submitButton}/>
  )
};

HostPollCard.propTypes = propTypes;
HostPollCard.defaultProps = defaultProps;

export default HostPollCard;
