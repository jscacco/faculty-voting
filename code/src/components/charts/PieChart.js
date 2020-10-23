import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import {Pie} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';


const PieChart = (props) => {
  const { dataLabels, dataValues} = props;

  const data = {
    labels: dataLabels,
  	datasets: [{
  		data: dataValues,
  		backgroundColor: [
    		Colors.LightBlue,
        Colors.Blue,
    	],
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

export default PieChart;
