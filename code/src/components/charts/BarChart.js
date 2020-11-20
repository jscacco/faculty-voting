import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import {HorizontalBar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const propTypes = {
  dataLabels: PropTypes.arrayOf(PropTypes.string) ,
  dataValues: PropTypes.arrayOf(PropTypes.number),

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {};

const BarChart = (props) => {
  const { dataLabels, dataValues,
          extraSmall, small, medium, large, extraLarge} = props;

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: 'Responses',
        showLabel: false,
        backgroundColor: Colors.Blue,
        borderColor: Colors.Blue,
        borderWidth: 1,
        hoverBackgroundColor: Colors.Blue,
        hoverBorderColor: Colors.Blue,
        data: dataValues,
      }
    ],
  };

  const options = {
    legend: {
            display: false
         },
     scales: {
         xAxes: [{
             ticks: {
                 beginAtZero: true
             }
         }]
     }
  }

  return (
    <HorizontalBar data={data}
                   options={options}
                   height={medium || large || extraLarge ? 100 : 75}/>
  )
}

BarChart.propTypes = propTypes;
BarChart.defaultProps = defaultProps;

export default BarChart;
