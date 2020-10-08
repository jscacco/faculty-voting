import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

// import Option           from './Option';

const propTypes = {
  children: PropTypes.node,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool
};

const defaultProps = {
};

const GroupWrapper = styled.div`
  width: auto;
`;

const OptionWrapper = styled.div`
  ${({lastChild, padding}) => !lastChild ? `padding-bottom: ${padding}px;` : ``}
  width: auto;
`;

const _renderOptions = ( props ) => {

  const { children, onClick, ...rest } = props;

  const { small, medium, large, extraLarge } = props;

  let padding;

  if ( small ) { padding = 10 }
  else if ( large ) { padding = 18 }
  else if ( extraLarge ) { padding = 22 }
  else { padding = 14 }

  return React.Children.map( children, ((item, index) => {
    const lastChild = index === children.length - 1;

    return (
      <OptionWrapper lastChild={lastChild} padding={padding}>
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
