import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';
import { CSVLink }      from "react-csv";

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';
import Button           from '../buttons/Button';


const CSVButton = ( props ) => {

  const { buttonColor, textColor } = props;

  const csvLinkStyle  = {
    'text-decoration': 'none',
    color: (textColor ? textColor : Colors.White)
  };

  return (
    <Button backgroundColor={buttonColor ? buttonColor : Colors.Blue} extraSmall={props.extraSmall} small={props.extraSmall}
            medium={props.extraSmall} large={props.large} extraLarge={props.extraLarge}>
      <CSVLink data={props.table} style={csvLinkStyle} filename={'results.csv'}>
        Export CSV
      </CSVLink>
    </Button>
  )
};

export default CSVButton;
