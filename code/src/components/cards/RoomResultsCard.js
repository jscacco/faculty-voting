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
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import mockData        from '../../store/mockData';


const ref = React.createRef();

const HiddenWrapper = styled.div`
  position: absolute;
  bottom: 20000px;
`;

const RoomResultsCard = ( props ) => {

  const _header = (
    <Jumbo extraSmall color={Colors.LightBlue}>
      {props.roomResults.title}
    </Jumbo>
  )

  const _toPDFButton = (
    <PDFDownloadLink document={<PDFPreviewCard />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  )

  const _renderCharts = () =>  {
    var chartComponents = props.roomResults.order.map((poll_id) => {
    const pollResults = props.roomResults.allResults[poll_id]

      return (
        <>
          <Body medium>
            {pollResults.title}
          </Body>
          <BarChart height={5} dataLabels={pollResults.optionsOrder.map(id => pollResults.options[id].value)}
                    dataValues={pollResults.optionsOrder.map(id => pollResults.results[id].count)} />
        </>
      )
    });

    return (
      <>
        {chartComponents}
      </>
    )
  }

  // const MyPDF = React.forwardRef((props, ref) => (
  //   <div ref={ref}>
  //     <PDFPreviewCard room={mockData.rooms['0000'] />
  //   </div>
  // );

  const _pdfChildren = (
    <>
      {_renderCharts()}
    </>
  )

  const _children = (
    <>
      {_renderCharts()}

    </>
  )
  // <HiddenWrapper>
  //   {<MyPDF ref={ref} header={_header} children={_pdfChildren} />}
  // </HiddenWrapper>

  return (
    <PrimaryCard cardColor={Colors.White} width={`100%`}
                 header={_header} headerButton={_toPDFButton}
                 children={_children}/>
  )
};

export default RoomResultsCard;
