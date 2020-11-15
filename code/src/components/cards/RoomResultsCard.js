import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import Button           from '../buttons/Button';
import SecondaryCard      from '../format-cards/SecondaryCard';

import PieChart    from '../charts/PieChart';
import BarChart    from '../charts/BarChart';

import Pdf from "react-to-pdf";
import { CSVLink } from "react-csv";
import { formatResultsAsCSV } from '../../csv/csvFunctions.js';

const ref = React.createRef();

const HiddenWrapper = styled.div`
  position: absolute;
  bottom: 20000px;
`;

const csvLinkStyle  = {
  // fontSize: 14,
  // fontWeight: 500,
  height: 52,
  'text-decoration': 'none',
  padding: '0 48px',
  borderRadius: 5,
  color: Colors.White,
};

const RoomResultsCard = ( props ) => {

  const { extraSmall, small, medium, large, extraLarge } = props;

  const filename = props.roomResults.title + ".csv"

  const _toCSVButton = (
    <Button backgroundColor={Colors.Blue} extraSmall={extraSmall} small={extraSmall}
            medium={extraSmall} large={large} extraLarge={extraLarge}>
      <CSVLink data={formatResultsAsCSV(props.roomResults)} style={csvLinkStyle} filename={filename}>
        Export CSV
      </CSVLink>
    </Button>
  )

  const _renderCharts = () =>  {
    var chartComponents = props.roomResults.order.map((poll_id) => {
    const pollResults = props.roomResults.allResults[poll_id]

      return (
        <>
          <Body medium>
            {pollResults.title}
          </Body>
          <BarChart dataLabels={pollResults.optionsOrder.map(id => pollResults.options[id].value)}
                    dataValues={pollResults.optionsOrder.map(id => pollResults.results[id].count)}
                    extraSmall={extraSmall} small={small}
                    medium={medium} large={large} extraLarge={extraLarge}/>
        </>
      )
    });

    return (
      <>
        {chartComponents}
      </>
    )
  }

  const _children = (
    <>
      {_renderCharts()}
    </>
  )

  return (
    <SecondaryCard cardColor={Colors.White} width={`100%`}
                   height={extraSmall ? `100%` : `stretch`}
                   header={props.roomResults.title} headerColor={Colors.Blue}
                   extraSmall={extraSmall} small={small}
                   medium={medium} large={large} extraLarge={extraLarge}
                   headerButton={_toCSVButton} children={_children}/>
  )
};

export default RoomResultsCard;
