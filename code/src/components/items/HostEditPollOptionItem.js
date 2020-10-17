import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import Item         from './Item';
import Button           from '../buttons/Button';

const propTypes = {
  pollTitle: PropTypes.string,

  buttonText: PropTypes.string,
  onClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  pollTitle: 'Poll Title',
  buttonText: 'VIEW'
};


const HostEditPollOptionItem = ( props ) => {

  const { text, ...rest } = props;

  return (
    <Item text={text}>
    </Item>
  )
}

HostEditPollOptionItem.propTypes = propTypes;
HostEditPollOptionItem.defaultProps = defaultProps;

export default HostEditPollOptionItem;
