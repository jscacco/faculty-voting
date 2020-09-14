import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';

const propTypes = {
  color: ExtraPropTypes.color,
  height: PropTypes.int,
  width: PropTypes.int
}

const defaultProps = {
  color: Colors.White,
}

const AgendaItemComponent = styled.div`
  background-color: ${({color}) => color};
  border-radius: 20px;
  height: ${({height}) => height ?`${height}px` : `auto`};
  width: ${({width}) => width ? `${width}px` : `100%`};
  padding: 35px;
`;

const AgendaItem = (props) => {

  const { children, ...rest } = props

  return (
    <AgendaItemComponent {...rest}>
      {children}
    </AgendaItemComponent>
  )
};

AgendaItem.propTypes = propTypes;
AgendaItem.defaultProps = defaultProps;

export default AgendaItem;
