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


// import { fetchAgenda, getPollResults } from '../../store/MockDataFunctions'

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

const RoomResultsCard = ( props ) => {

  // const { room } = props;
  // const roomcode = '0000'
  // const room = fetchAgenda(roomcode);


  const _header = (
    <Jumbo extraSmall color={Colors.LightBlue}>
      {props.roomResults.title}
    </Jumbo>
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



  const _children = (
    <>
      {_renderCharts()}
    </>
  )

  return (
    <PrimaryCard cardColor={Colors.White} width={`100%`}
                 header={_header} children={_children}/>
  )
};

export default RoomResultsCard;
