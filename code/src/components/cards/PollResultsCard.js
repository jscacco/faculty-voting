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
import AdderOption      from '../options/AdderOption';
import Option           from '../options/Option';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';
import InputField       from '../inputs/InputField';
import TextArea         from '../inputs/TextArea';
import EditingOption    from '../options/EditingOption';
import PrimaryCard      from '../format-cards/PrimaryCard';

import PieChart    from '../charts/PieChart';
import BarChart    from '../charts/BarChart';


import { fetchPollResults } from '../../store/MockDataFunctions'

const ChildWrapper = styled.div`
  padding-top: 20px;
`;

const LeftColumnWrapper = styled.div`
  width: 30%;
`;
const TwoColumnWrapper = styled.div`
  display: flex;
  direction: row;
  align-items: flex-start;
`;

function getValues(map, key){
  var values = [];

  return values;
}

const PollResultsCard = ( props ) => {

  const { pollResults } = props;

  const _header = (
    <Jumbo extraSmall color={Colors.LightBlue}>
      {pollResults.title}
    </Jumbo>
  )

  const _description = (
    <Body small color={Colors.Charcol}>
      {pollResults.description}
    </Body>
  )


  const _chart = (
    <BarChart dataLabels={pollResults.optionsOrder.map(id => pollResults.options[id].value)}
              dataValues={pollResults.optionsOrder.map(id => pollResults.results[id].count)}/>
  )

  const _children = (
    <>
      {_description}
      {_chart}
    </>
  )

  return (
    <PrimaryCard extraSmall cardColor={Colors.White}
                 header={_header} children={_children}/>
  )
};

export default PollResultsCard;
