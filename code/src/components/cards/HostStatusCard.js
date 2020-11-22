import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';

import StatusText       from '../format-text/StatusText';
import Button           from '../buttons/Button';

import Card             from './Card';


const propTypes = {
  disabled: PropTypes.bool,

  editing: PropTypes.bool,
  loading: PropTypes.bool,
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

  const { editing, loading, status, onClick, size } = props;

  let disabled = false;
  let text;
  let color;
  let newStatus;

  if ( loading ) {
    disabled = true;
    text = 'WAIT';
    color = Colors.LightGrey;
  }
  else if ( status === 'closed') {
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

  console.log(props.disable)
  if ( editing || props.disable ) {
    color = Colors.LightGrey;
    disabled = true;
  }

  return (
    <Button backgroundColor={editing ? Colors.LightGrey : color} onClick={() => onClick(newStatus)}
            disabled={editing ? true : disabled} {...size}>
      {text}
    </Button>
  )

}

const PanelSection = ( props ) => {

  const { disable, editing, loading, status, children,
          onStatusClick, color, size, } = props;

  console.log(props.viewport)

  if (props.viewport === 'smallMobile' || props.viewport === 'mobile') {
    return (
      <HorizontalSectionWrapper>
        <StatusText status={loading ? 'loading' : status} color={color} {...size}/>
        {children}
        <ButtonWrapper>
          <StatusButton disable={disable} editing={editing} loading={loading} status={status}
                        onClick={onStatusClick} size={size}/>
        </ButtonWrapper>
      </HorizontalSectionWrapper>
    )
  }
  return (
    <SectionWrapper>
      <SectionHeadingWrapper>
        <StatusText status={loading ? 'loading' : status} color={color} {...size}/>
      </SectionHeadingWrapper>
      {children}
      <StatusButton disable={disable} editing={editing} loading={loading} status={status}
                    onClick={onStatusClick} size={size}/>
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
      <PanelHeader loading={props.loading} color={props.headerColor} {...size}/>
      <PanelSection disable={props.disable} editing={props.editing} loading={props.loading}
                    status={props.pollStatus} onStatusClick={props.onStatusClick}
                    color={props.textColor} size={size}/>
    </Card>
  )
}

HostStatusCard.propTypes = propTypes;
HostStatusCard.defaultProps = defaultProps;

export default HostStatusCard;
