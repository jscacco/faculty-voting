import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import {Pie} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';


const BarChart = (props) => {
  const { dataLabels, dataValues} = props;

  const data = {
    labels: dataLabels,
  	datasets: [{
  		data: dataValues,
  		backgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    	],
  		hoverBackgroundColor: [
    		'#FF6384',
    		'#36A2EB',
    		'#FFCE56'
    	]
  	}]
  };

  const options = {
    legend: {
            display: true
         }
  }

  return (
    <Pie data={data}
                   options={options}/>
  )
}

export default BarChart;
