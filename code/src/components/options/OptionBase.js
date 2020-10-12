import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Icon             from '../theme/Icon';
import { Colors }       from '../theme/Colors';
import Bubble           from '../buttons/Bubble';
import CheckBox         from '../buttons/CheckBox';

const propTypes = {
  children: PropTypes.node,
  iconButton: PropTypes.node,
  extraIcons: PropTypes.arrayOf(PropTypes.node),

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


const DummyIcon = styled.div`
  height: ${({size}) => size};
  width: ${({size}) => size};
`;

const optionConfig = {
  small: { padding: `12px`,
           iconSize: '1em' },
  medium: { padding: `16px`,
           iconSize: '1.5em'},
  large: { padding: `20px`,
           iconSize: '1.75em'},
  extraLarge: { padding: `28px`,
           iconSize: '2em'},
};

const renderExtraIcons = ( props, padding ) => {

  const { extraIcons, small, medium, large, extraLarge } = props;

  const itemProps = { small: small, medium: medium,
                      large: large, extraLarge: extraLarge };

  return extraIcons.map((item) => (
    <ExtraIconWrapper padding={padding}>
      {React.cloneElement(item, {...itemProps})}
    </ExtraIconWrapper>
  ))
}


const OptionBase = (props) => {

  const { children, iconButton, extraIcons,
          small, medium, large, extraLarge } = props;

  let padding;

  if (extraLarge) { padding = `28px` }
  else if (large) { padding =  `20px` }
  else if (small) { padding = `12px` }
  else { padding = `16px` }

  const itemProps = { small: small, medium: medium,
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
