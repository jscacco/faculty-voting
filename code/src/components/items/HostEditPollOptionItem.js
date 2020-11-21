import React            from 'react';

import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import EditItem         from './EditItem';

import Input            from '../inputs/Input';

const propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['inputfield', 'textarea']),
  value: PropTypes.string,
  onDelete: PropTypes.func,

  iconColor: ExtraPropTypes.color,
  fontColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  type: 'inputfield',
  iconColor: Colors.Blue,
  fontColor: Colors.Black,
};


const HostEditPollOptionItem = ( props ) => {

  const { id, type, value, onChange, onDelete, ...rest } = props;

  return (
    <EditItem id={id} iconColor={Colors.Blue} onDelete={onDelete} {...rest}>
      <Input type={type} value={value} onChange={onChange}/>
    </EditItem>
  )
}

HostEditPollOptionItem.propTypes = propTypes;
HostEditPollOptionItem.defaultProps = defaultProps;

export default HostEditPollOptionItem;
