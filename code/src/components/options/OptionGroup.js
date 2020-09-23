import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Option           from './Option';

const propTypes = {
  children: PropTypes.node,

  large: PropTypes.bool,
  extraLarge: PropTypes.bool
};

const defaultProps = {
};

const GroupWrapper = styled.div`
  width: auto;
`;

const OptionWrapper = styled.div`
  ${({lastChild, large, extraLarge}) => !lastChild && (large || extraLarge) ? `padding-bottom: 24px;` : `padding-bottom: 18px;`}
  width: auto;
`;

const _renderOptions = ( props ) => {
  const { children, ...rest } = props;

  return children.map((item, index) => {
    const lastChild = index === children.length - 1;

    return (
      <OptionWrapper lastChild={lastChild} {...rest}>
        {React.cloneElement(item, {...rest})}
      </OptionWrapper>
    )
  })
};

const OptionGroup = (props) => {

  return (
    <GroupWrapper>
      {_renderOptions(props)}
    </GroupWrapper>
  )
};

OptionGroup.propTypes = propTypes;
OptionGroup.defaultProps = defaultProps;

export default OptionGroup;
