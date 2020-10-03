import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Option           from './Option';

const propTypes = {
  children: PropTypes.node,

  // InputOption / TextOption props
  buttonColor: ExtraPropTypes.color,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

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
  const { children, onClick, ...rest } = props;

  // console.log(props);

  return React.Children.map( children, ((item, index) => {
    const lastChild = index === children.length - 1;

    return (
      <OptionWrapper lastChild={lastChild} {...rest}>
        {React.cloneElement(item, {...rest, ...item.props})}
      </OptionWrapper>
    )
  }))
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
