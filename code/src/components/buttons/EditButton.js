import React            from 'react';
import styled               from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Icon             from '../theme/Icon';
import Body             from '../theme/Body'

const propTypes = {
  type: PropTypes.oneOf(['edit', 'save']),
}

const defaultProps = {

}

const ButtonWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TextWrapper = styled.div`
  width: auto;
`

const EditButton = ( props ) => {

  const { children, type, color, onClick, ...rest } = props;

  return (
    <ButtonWrapper onClick={onClick}>
      <IconWrapper>
        <Icon type={type} color={color}
              small={props.extraSmall} medium={props.small} large={props.medium}
              extraLarge={props.large} twoExtraLarge={props.extraLarge}/>
      </IconWrapper>
      <Body color={color} {...rest}>
        { type === 'edit' ? 'EDIT' : 'SAVE'}
      </Body>
    </ButtonWrapper>
  )
}

EditButton.propTypes = propTypes;
EditButton.defaultProps = defaultProps;

export default EditButton;
