import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import OptionGroup      from '../groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption      from '../options/InputOption';
import AdderOption      from '../options/AdderOption';
import Option           from '../options/Option';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';
import InputField       from '../inputs/InputField';
import TextArea         from '../inputs/TextArea';
import EditingOption    from '../options/EditingOption';
import SecondaryCard      from '../format-cards/SecondaryCard';

import PieChart    from '../charts/PieChart';
import BarChart    from '../charts/BarChart';

import Pdf from "react-to-pdf";

const ref = React.createRef();


const HiddenWrapper = styled.div`
  position: absolute;
  bottom: 20000px;
`;

const PollResultsCard = ( props ) => {

  const { pollResults,
          extraSmall, small, medium, large, extraLarge} = props;


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
    <SecondaryCard cardColor={Colors.White} width={`100%`}
                   height={extraSmall ? `100%` : `stretch`}
                   header={props.pollResults.title} headerColor={Colors.Blue}
                   extraSmall={extraSmall} small={small}
                   medium={medium} large={large} extraLarge={extraLarge}
                   children={_children}/>
  )
};

export default PollResultsCard;
