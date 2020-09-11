import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Option           from './Option';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color
};

const defaultProps = {
  options: []
};

const GroupWrapper = styled.div``;

const OptionWrapper = styled.div`
  ${({lastChild, large, extraLarge}) => !lastChild && (large || extraLarge) ? `padding-bottom: 18px` : `padding-bottom: 12px`}
`;

const renderOptions = ( props ) => {
  const { options, ...rest } = props;

  return options.map((item, index) => {
    const lastChild = index === options.length - 1;

    return (
      <OptionWrapper lastChild={lastChild} {...rest}>
        <Option {...rest}>
          {item}
        </Option>
      </OptionWrapper>
    )
  })
};

const OptionGroup = (props) => {

  const options = renderOptions(props);

  return (
    <GroupWrapper>
      {options}
    </GroupWrapper>
  )
};

OptionGroup.propTypes = propTypes;
OptionGroup.defaultProps = defaultProps;

export default OptionGroup;
