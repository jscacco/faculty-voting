import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Card             from '../cards/Card';

const propTypes = {
  children: PropTypes.node, // components for right side
  text: PropTypes.string,

  fontColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  text: 'Item'
}

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextWrapper = styled.div `
  width: 100%;
`;

const ChildWrapper = styled.div`
  ${({padding}) => `padding-left: ${padding}px;`}
`;

const ItemBase = ( props ) => {

  const { children, text, ...rest } = props;

  let padding;
  if ( props.extraSmall ) { padding = 10 }
  else if ( props.small ) { padding = 12 }
  else if ( props.large ) { padding = 20 }
  else if ( props.extraLarge ) { padding = 24 }
  else { padding = 16 }

  const renderChildren = React.Children.map(children, (item) => {
    return (
      <ChildWrapper padding={padding}>
        {React.cloneElement(item, {...rest})}
      </ChildWrapper>
    )
  })

  return (
    <Card borderSmall>
      <ComponentWrapper>
        <TextWrapper>
          <Body {...rest}>
            {text}
          </Body>
        </TextWrapper>
        {renderChildren}
      </ComponentWrapper>
    </Card>
  )

}

ItemBase.propTypes = propTypes;
ItemBase.defaultProps = defaultProps;

export default ItemBase;
