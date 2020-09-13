import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';

const propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const defaultProps = {
  value: '',
  handleChange: undefined,
  handleSubmit: undefined
};

const RoomCodeForm = (props) => {

    const { value, handleChange, handleSubmit } = props;

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Room Code:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

};

RoomCodeForm.propTypes = propTypes;
RoomCodeForm.defaultProps = defaultProps;

export default RoomCodeForm;
