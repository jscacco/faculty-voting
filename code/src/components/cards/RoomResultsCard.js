import React            from 'react';
import PropTypes        from 'prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';

import SecondaryCard    from '../format-cards/SecondaryCard';

import BarChart         from '../charts/BarChart';
import CSVButton        from '../buttons/CSVButton';
import { formatResultsAsCSV } from '../../csv/csvFunctions.js';

const propTypes = {
  roomResults: PropTypes.object,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {

};

const RoomResultsCard = ( props ) => {

  const { extraSmall, small, medium, large, extraLarge } = props;

  // const filename = props.roomResults.title + ".csv"

  const _toCSVButton = (
    <CSVButton table={formatResultsAsCSV(props.roomResults)}
               extraSmall={extraSmall} small={small}
               medium={medium} large={large} extraLarge={extraLarge} />
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

RoomResultsCard.propTypes = propTypes;
RoomResultsCard.defaultProps = defaultProps;

export default RoomResultsCard;
