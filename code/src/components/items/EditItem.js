import React                  from "react";
import styled                 from 'styled-components';
import PropTypes              from 'prop-types';
import ExtraPropTypes         from 'react-extra-prop-types';

import Icon                   from '../theme/Icon';

const propTypes = {
  children: PropTypes.node,
  iconColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {};

const ComponentWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${({padding}) => padding}px;
  cursor: pointer;
`;

const EditItem = ( props ) => {

  const { children, iconColor, onDelete, ...rest } = props;

  let padding;
  if ( props.extraSmall ) { padding = 10 }
  else if ( props.small ) { padding = 12 }
  else if ( props.large ) { padding = 20 }
  else if ( props.extraLarge ) { padding = 24 }
  else { padding = 16 }

  return (
    <ComponentWrapper>
        <ItemWrapper>
          {React.cloneElement(children, {...rest})}
        </ItemWrapper>
        <IconWrapper padding={padding}>
          <Icon type={'trash'} color={iconColor} onClick={onDelete}
                small={props.extraSmall} medium={props.small}
                large={props.medium} extraLarge={props.large}
                twoExtraLarge={props.extraLarge}/>
        </IconWrapper>
    </ComponentWrapper>
  )
};

EditItem.propTypes = propTypes;
EditItem.defaultProps = defaultProps;

export default EditItem;
