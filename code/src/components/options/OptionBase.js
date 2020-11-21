import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,
  iconButton: PropTypes.node,
  extraIcons: PropTypes.arrayOf(PropTypes.node),

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  buttonColor: Colors.Black,
  onClick: undefined,
  clicked: false,
  buttonType: 'bubble',
};

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${({padding}) => padding};
`;

const ExtraIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${({padding}) => padding};
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  /* border: 1px solid black; */
`;


const renderExtraIcons = ( props, padding ) => {

  const { extraIcons, extraSmall, small, medium, large, extraLarge } = props;

  const itemProps = { extraSmall: extraSmall, small: small, medium: medium,
                      large: large, extraLarge: extraLarge };

  return extraIcons.map((item) => (
    <ExtraIconWrapper padding={padding}>
      {React.cloneElement(item, {...itemProps})}
    </ExtraIconWrapper>
  ))
}


const OptionBase = (props) => {

  const { children, iconButton, extraIcons,
          extraSmall, small, medium, large, extraLarge } = props;

  let padding;

  if (extraLarge) { padding = `28px` }
  else if (large) { padding =  `20px` }
  else if (small) { padding = `12px` }
  else if (extraSmall) { padding = `10px`}
  else { padding = `16px` }

  const itemProps = { extraSmall: extraSmall, small: small, medium: medium,
                      large: large, extraLarge: extraLarge };

  return (
    <OptionWrapper>
      <IconButtonWrapper padding={padding}>
        {React.cloneElement(iconButton, {...itemProps})}
      </IconButtonWrapper>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
      { extraIcons ? renderExtraIcons(props, padding) : <div/>}
    </OptionWrapper>
  )

};

OptionBase.propTypes = propTypes;
OptionBase.defaultProps = defaultProps;

export default OptionBase;
