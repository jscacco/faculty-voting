import React            from 'react';
import PropTypes        from 'prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';

import SecondaryCard      from '../format-cards/SecondaryCard';

import BarChart    from '../charts/BarChart';


const propTypes = {
  pollResults: PropTypes.object,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  pollResults: {},
};

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

PollResultsCard.propTypes = propTypes;
PollResultsCard.defaultProps = defaultProps;

export default PollResultsCard;
