import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body            from '../theme/Body';

import OptionGroup      from '../option-groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption       from '../options/InputOption';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';
import TextArea       from '../inputs/TextArea';
import EditingOption  from '../options/EditingOption';
import PrimaryCard from '../format-cards/PrimaryCard';

import PollCardBase from './PollCardBase'


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

  const _header = pollData.pollTitle;

  const _description = (
    <>
      <Body medium color={Colors.Charcol}>
        Description
      </Body>
      <TextArea medium>
        {pollData.description}
      </TextArea>
    </>
  )

  const _renderOptionGroup = () => {
    var optionComponents = pollData.options.map(optionData => {
      return optionData.optionType === 'text' ?
            <EditingOption>

            </EditingOption> :
            <InputOption medium>
              {optionData.value}
            </InputOption>;
    });

    return (
      <>
        <Body medium color={Colors.Charcol}>
          Options
        </Body>
        <OptionGroup>
          {optionComponents}
        </OptionGroup>
      </>
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
    <PrimaryCard extraSmall cardColor={Colors.White}
                 header={_header} />
    // <PollCardBase header={_header}
    //               description={_description}
    //               optionGroup={_renderOptionGroup()}
    //               button={_renderButton()}/>
  )
};

export default EditPollCard;
