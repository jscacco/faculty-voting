import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import OptionGroup      from '../option-groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption      from '../options/InputOption';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';
import InputField       from '../inputs/InputField';
import TextArea         from '../inputs/TextArea';
import EditingOption    from '../options/EditingOption';
import PrimaryCard      from '../format-cards/PrimaryCard';
import EditButton       from '../buttons/EditButton';

import { fetchPollData } from '../../store/MockDataFunctions'

const EditOptionsWrapper = styled.div`
  padding-top: 20px;
`;

const EditPollCard = ( props ) => {

  const { pollData } = props;

  const _header = (
    <InputField medium height={75} />
  )

  const _headerButton = (
    <EditButton type={'save'} color={Colors.Blue} onClick={props.onEditClick}/>
  )

  const _description = (
    <TextArea medium>
      {pollData.description}
    </TextArea>
  )

  const _renderOptionGroup = () => {
    var optionComponents = pollData.options.map(optionData => {
      return optionData.optionType === 'text' ?
            <InputField medium value={optionData.value} /> :
            <></>;
    });

    return (
      <EditOptionsWrapper>
        <Body small color={Colors.Charcol}>
          Options
        </Body>
        <OptionGroup>
          {optionComponents}
        </OptionGroup>
      </EditOptionsWrapper>
    );
  }

  const _children = (
    <>
      {_description}
      {_renderOptionGroup()}
    </>
  )

  return (
    <PrimaryCard extraSmall cardColor={Colors.White}
                 header={_header} headerButton={_headerButton}
                 children={_children}/>
  )
};

export default EditPollCard;
