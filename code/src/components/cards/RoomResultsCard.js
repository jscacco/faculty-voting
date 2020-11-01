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

// import { fetchAgenda, getPollResults } from '../../store/MockDataFunctions'

const ref = React.createRef();

const HiddenWrapper = styled.div`
  position: absolute;
  bottom: 20000px;
`;

const RoomResultsCard = ( props ) => {

  // const { room } = props;
  // const roomcode = '0000'
  // const room = fetchAgenda(roomcode);


  const _header = (
    <Jumbo extraSmall color={Colors.LightBlue}>
      {props.roomResults.title}
    </Jumbo>
  )

  const _toPDFButton = (
    <Pdf targetRef={ref} filename="poll-results.pdf">
      {({ toPdf }) => <Button medium onClick={toPdf}>Download Pdf</Button>}
    </Pdf>
  )

  const _renderCharts = () =>  {
    // console.log(room);
    // console.log(roomcode);
    // console.log(room.order['closed'])
    var chartComponents = props.roomResults.order.map((poll_id) => {
      // var pollResults = getPollResults(roomcode, poll_id)

    const pollResults = props.roomResults.allResults[poll_id]
    console.log(pollResults)

      return (
        <>
          <Body medium>
            {pollResults.title}
          </Body>
          <BarChart dataLabels={pollResults.optionsOrder.map(id => pollResults.options[id].value)}
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

  const MyPDF = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <PDFPreviewCard header={props.header} children={props.children} />
    </div>
  ));

  const _pdfChildren = (
    <>
      {_renderCharts()}
    </>
  )

  const _children = (
    <>
      {_renderCharts()}
      <HiddenWrapper>
        {<MyPDF ref={ref} header={_header} children={_pdfChildren} />}
      </HiddenWrapper>
    </>
  )

  return (
    <PrimaryCard cardColor={Colors.White} width={`100%`}
                 header={_header} headerButton={_toPDFButton}
                 children={_children}/>
  )
};

export default RoomResultsCard;
