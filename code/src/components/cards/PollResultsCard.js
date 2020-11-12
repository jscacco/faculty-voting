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
import PDFPreviewCard      from './PDFPreviewCard';

import PieChart    from '../charts/PieChart';
import BarChart    from '../charts/BarChart';

import Pdf from "react-to-pdf";
import { CSVLink } from "react-csv";

const ref = React.createRef();


const HiddenWrapper = styled.div`
  position: absolute;
  bottom: 20000px;
`;

const PollResultsCard = ( props ) => {

  const { pollResults } = props;

  // Array of arrays. Each item is rendered as a CSV line
  const data = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

  const _header = (
    <Jumbo extraSmall color={Colors.Blue}>
      {pollResults.title}
    </Jumbo>
  )

  const _toPDFButton = (
    <Button>
    <CSVLink data={data}>
      Download me
    </CSVLink>
    </Button>
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
    <PrimaryCard cardColor={Colors.White} width={`100%`}
                 header={_header} children={_children}/>
  )
};

export default PollResultsCard;
