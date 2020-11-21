import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Icon             from '../theme/Icon';

import Item         from './Item';
import StatusText       from '../format-text/StatusText';

import Button           from '../buttons/Button';

const propTypes = {
  pollTitle: PropTypes.string,
  status: PropTypes.oneOf(['closed', 'open', 'pending']),

  onViewClick: PropTypes.func,
  hostButton: PropTypes.node,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  pollTitle: 'Poll Title',
  status: 'pending'
};

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column:
  justify-content: center;
  padding: 3px 0px 3px 0px;
`;


const AgendaItem = ( props ) => {

  const { pollTitle, status, onViewClick, onStatusClick, hostButton,
          ...rest } = props;

  const statusText = <StatusText status={status} {...rest}/>

  const disabled_props = onViewClick === undefined ?
    { backgroundColor: Colors.LightGrey, disabled: true} :
    {};

  const viewButton = props.extraSmall ?
    <Button {...rest} onClick={onViewClick} {...disabled_props}>
      <IconWrapper>
        <Icon type={'view'} color={Colors.White} small/>
      </IconWrapper>
    </Button> :
    <Button {...rest} onClick={onViewClick} {...disabled_props}>
      VIEW
    </Button>


  if ( hostButton ){
    return (
      <Item text={pollTitle} {...rest}>
        { statusText }
        { hostButton }
        { viewButton }
      </Item>
    )
  }

  return (
    <Item text={pollTitle} {...rest}>
      { statusText }
      { viewButton }
    </Item>
  )

}

AgendaItem.propTypes = propTypes;
AgendaItem.defaultProps = defaultProps;

export default AgendaItem;
