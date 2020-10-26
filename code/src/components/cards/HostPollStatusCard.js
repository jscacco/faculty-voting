import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import StatusText       from '../format-text/StatusText';
import Button           from '../buttons/Button';

import Card             from './Card';


const propTypes = {
  pollStatus: PropTypes.string,

  updateStatus: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {

};

const HeadingWrapper = styled.div`
`;

const SectionWrapper = styled.div`
  padding-top: 15px;
`;

const SectionHeadingWrapper = styled.div`
  padding-bottom: 10px;
`;

const PanelHeader = ( props ) => {

  return (
    <HeadingWrapper>
      <Jumbo fiveExtraSmall={props.extraSmall} fourExtraSmall={props.small}
             threeExtraSmall={props.medium} twoExtraSmall={props.large}
             extraSmall={props.extraLarge} color={Colors.Blue}>
        STATUS
      </Jumbo>
    </HeadingWrapper>
  )
}

const StatusButton = ( props ) => {

  const { status, onClick, size, ...rest } = props;

  let disabled = false;
  let text;
  let color;

  if ( status === 'closed') {
    disabled = true;
    text = 'CLOSED';
    color = Colors.LightGrey;
  }
  else if ( status === 'open' ) {
    text = 'CLOSE';
    color = Colors.Red;
  }
  else {
    text = 'OPEN';
    color = Colors.Green;
  }

  return (
    <Button backgroundColor={color} onClick={onClick}
            disabled={disabled} {...size}>
      {text}
    </Button>
  )

}

const PanelSection = ( props ) => {

  const { status, children, onStatusClick, size, ...rest } = props;

  return (
    <SectionWrapper>
      <SectionHeadingWrapper>
        <StatusText status={status} {...size}/>
      </SectionHeadingWrapper>
      {children}
      <StatusButton status={status} onClick={onStatusClick} size={size}/>
    </SectionWrapper>
  )
}

const HostEditPanelCard = ( props ) => {

  const size = {
    extraSmall: props.extraSmall,
    small: props.small,
    medium: props.medium,
    large: props.large,
    extraLarge: props.extraLarge
  }

  return (
    <Card medium>
      <PanelHeader {...size}/>
      <PanelSection status={'closed'} onStatusClick={props.onStatusClick} size={size}/>
    </Card>
  )
}

HostEditPanelCard.propTypes = propTypes;
HostEditPanelCard.defaultProps = defaultProps;

export default HostEditPanelCard;
