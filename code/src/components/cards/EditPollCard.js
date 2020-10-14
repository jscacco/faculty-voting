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
import Input            from '../inputs/Input';
import TextArea       from '../inputs/TextArea';
import EditingOption  from '../options/EditingOption';

import { fetchPollData } from '../../store/MockDataFunctions'

const EditHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  direction: row;
  position: relative;
  width: 100%;
`;

const EditPollCard = ( props ) => {

  const { pollTitle } = props;
  const pollData = fetchPollData(pollTitle);

  const _header = (
    <EditHeaderWrapper>
      <Input extraLarge placeholder={pollTitle}/>
    </EditHeaderWrapper>
  )

  const _description = (
    <TextArea placeholder={pollData.description} />
  )

  const _renderOptionGroup = () => {
    var optionComponents = pollData.options.map(optionData => {
      return optionData.optionType === 'text' ?
            <EditingOption>
              <Body>Hello</Body>
            </EditingOption> :
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

    return (
      <Button backgroundColor={Colors.Green} textColor={Colors.White}>
        SAVE
      </Button>
    )
  }

  return (
    <PollCardBase header={_header}
                  description={_description}
                  optionGroup={_renderOptionGroup()}
                  button={_renderButton()}/>
  )
};

export default EditPollCard;
