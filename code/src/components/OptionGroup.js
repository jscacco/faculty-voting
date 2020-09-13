import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Option           from './Option';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  handleOptionClick: PropTypes.func,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color
};

const defaultProps = {
  options: [],
  handleOptionClick: undefined
};

const GroupWrapper = styled.div``;

const OptionWrapper = styled.div`
  ${({lastChild, large, extraLarge}) => !lastChild && (large || extraLarge) ? `padding-bottom: 24px` : `padding-bottom: 18px`}
`;

const renderOptions = ( props ) => {
  const { options, handleOptionClick, selectedBubble, ...rest } = props;

  return options.map((item, index) => {
    const lastChild = index === options.length - 1;

    let selected = (index === selectedBubble) ? true : false;

    return (
      <OptionWrapper lastChild={lastChild} {...rest}>
        <Option onClick={(event) => handleOptionClick(index)} selected={selected} {...rest}>
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
