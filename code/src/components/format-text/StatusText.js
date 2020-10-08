import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Icon             from '../theme/Icon';

const propTypes = {
  status: PropTypes.string,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  status: 'open',
}

const ComponentWrapper = styled.div`
  display: inline-block;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-directon: row;
  justify-content: flex-start;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${({padding}) => padding};
`;

const statusConfig = {
  pending: { color: Colors.Yellow,
             text: 'PENDING' },
  open: { color: Colors.Green,
          text: 'OPEN' },
  closed: { color: Colors.Red,
             text: 'CLOSED' }
};

const sizeConfig = {
  extraSmall: {size: '0.75em',
               padding: '5px'},
  small: {size: '0.9em',
               padding: '6px'},
  medium: {size: '1em',
               padding: '8px'},
  large: {size: '1.25em',
               padding: '10px'},
  extraLarge: {size: '1.5em',
               padding: '12px'},
};

const getStatusConfig = ( status ) => {

  switch (status) {
    case 'open':
      return statusConfig.open;
    case 'closed':
      return statusConfig.closed;
    default:
      return statusConfig.pending;

  }
};

const getSizeConfig = ( args ) => {
  const { extraSmall, small, medium, large, extraLarge } = args;

  if (extraSmall) { return sizeConfig.extraSmall }
  else if (small) { return sizeConfig.small }
  else if (large) { return sizeConfig.large }
  else if (extraLarge) { return sizeConfig.extraLarge }
  else { return sizeConfig.medium }
}

const dotIcon = ( sizeConfig, color ) => (
  <IconWrapper padding={sizeConfig.padding}>
    <Icon type={'fullCircle'} size={sizeConfig.size} color={color}/>
  </IconWrapper>
)

const StatusText = ( props ) => {

  const { status, ...rest} = props;

  const sizeConfig = getSizeConfig(rest);
  const statusConfig = getStatusConfig(status);

  return (
    <ComponentWrapper>
      <ItemWrapper>
        {dotIcon(sizeConfig, statusConfig.color)}
        <TextWrapper>
          <Body {...rest}>
            {statusConfig.text}
          </Body>
        </TextWrapper>
      </ItemWrapper>
    </ComponentWrapper>
  )
};

StatusText.propTypes = propTypes;
StatusText.defaultProps = defaultProps;

export default StatusText;
