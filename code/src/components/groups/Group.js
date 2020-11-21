import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';


const propTypes = {
  children: PropTypes.node,

  extraSmall: PropTypes.bool,
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

const ItemWrapper = styled.div`
  ${({lastChild, padding}) => !lastChild ? `padding-bottom: ${padding}px;` : ``}
  width: auto;
`;

const _renderOptions = ( props ) => {

  const { children, onClick, ...rest } = props;

  const { extraSmall, small, large, extraLarge } = props;

  let padding;

  if ( extraSmall ) { padding = 10}
  else if ( small ) { padding = 10 }
  else if ( large ) { padding = 18 }
  else if ( extraLarge ) { padding = 22 }
  else { padding = 14 }

  console.log(children);

  return React.Children.map( children, ((item, index) => {
    const lastChild = index === children.length - 1;

    return (
      <ItemWrapper id={item.props.id} lastChild={lastChild} padding={padding}>
        {React.cloneElement(item, {...rest, ...item.props})}
      </ItemWrapper>
    )
  }))
};

const Group = (props) => {

  return (
    <GroupWrapper>
      {_renderOptions(props)}
    </GroupWrapper>
  )
};

Group.propTypes = propTypes;
Group.defaultProps = defaultProps;

export default Group;
