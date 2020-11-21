import React            from 'react';

import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { CSVLink }      from "react-csv";

import { Colors }       from '../theme/Colors';
import Button           from '../buttons/Button';

const propTypes = {
  buttonColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  buttonColor: Colors.Blue,
  textColor: Colors.White
};

const CSVButton = ( props ) => {

  const { buttonColor, textColor } = props;

  const csvLinkStyle  = {
    'text-decoration': 'none',
    color: textColor
  };

  return (
    <Button backgroundColor={buttonColor} 
            extraSmall={props.extraSmall} small={props.extraSmall}
            medium={props.extraSmall} large={props.large} extraLarge={props.extraLarge}>
      <CSVLink data={props.table} style={csvLinkStyle} filename={'results.csv'}>
        Export CSV
      </CSVLink>
    </Button>
  )
};

CSVButton.propTypes = propTypes;
CSVButton.defaultProps = defaultProps;

export default CSVButton;
