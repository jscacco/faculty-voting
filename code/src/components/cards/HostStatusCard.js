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

  headerColor: ExtraPropTypes.color,
  textColor: ExtraPropTypes.color,
  cardColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  headerColor: Colors.White
};

const HeadingWrapper = styled.div`
`;

const SectionWrapper = styled.div`
  padding-top: 15px;
`;

const SectionHeadingWrapper = styled.div`
  padding-bottom: 10px;
`;

const HorizontalSectionWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  width: auto;
`;

const PanelHeader = ( props ) => {

  return (
    <HeadingWrapper>
      <Jumbo fiveExtraSmall={props.extraSmall} fourExtraSmall={props.small}
             threeExtraSmall={props.medium} twoExtraSmall={props.large}
             extraSmall={props.extraLarge} color={props.color}>
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
  let newStatus;

  if ( status === 'closed') {
    disabled = true;
    text = 'CLOSED';
    color = Colors.LightGrey;
  }
  else if ( status === 'open' ) {
    text = 'CLOSE';
    color = Colors.Red;
    newStatus = 'closed';
  }
  else {
    text = 'OPEN';
    color = Colors.Green;
    newStatus = 'open';
  }

  return (
    <Button backgroundColor={color} onClick={() => onClick(newStatus)}
            disabled={disabled} {...size}>
      {text}
    </Button>
  )

}

const PanelSection = ( props ) => {

  const { status, children, onStatusClick, color, size, ...rest } = props;

  if (size.extraSmall) {
    return (
      <HorizontalSectionWrapper>
        <StatusText status={status} color={color} {...size}/>
        {children}
        <ButtonWrapper>
          <StatusButton status={status} onClick={onStatusClick} size={size}/>
        </ButtonWrapper>
      </HorizontalSectionWrapper>
    )
  }
  return (
    <SectionWrapper>
      <SectionHeadingWrapper>
        <StatusText status={status} color={color} {...size}/>
      </SectionHeadingWrapper>
      {children}
      <StatusButton status={status} onClick={onStatusClick} size={size}/>
    </SectionWrapper>
  )
}

const HostStatusCard = ( props ) => {

  const size = {
    extraSmall: props.extraSmall,
    small: props.small,
    medium: props.medium,
    large: props.large,
    extraLarge: props.extraLarge
  }

  return (
    <Card color={props.cardColor} borderColor={props.borderColor} borderMedium {...size}>
      <PanelHeader color={props.headerColor} {...size}/>
      <PanelSection status={props.pollStatus} onStatusClick={props.onStatusClick}
                    color={props.textColor} size={size}/>
    </Card>
  )
}

HostStatusCard.propTypes = propTypes;
HostStatusCard.defaultProps = defaultProps;

export default HostStatusCard;
