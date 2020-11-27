import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body            from '../theme/Body';

import StatusText       from '../format-text/StatusText';
import Button           from '../buttons/Button';
import CSVReader        from '../csvreader/CSVReader';

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
  padding-bottom: 15px;
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
        Upload Voters
      </Jumbo>
    </HeadingWrapper>
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

  const text = 'Uploaded file: ' + (props.fileUploaded ? props.fileUploaded : 'NONE')

  return (
    <Card color={Colors.Blue} borderColor={props.borderColor} borderMedium {...size}>
      <PanelHeader loading={props.loading} color={props.headerColor} {...size}/>
      <Body color={Colors.White} {...size}>
        {text}
      </Body>
      <SectionWrapper>
        <CSVReader loading={props.loading} onUpload={props.onUpload} {...size}/>
      </SectionWrapper>
    </Card>
  )
}

HostStatusCard.propTypes = propTypes;
HostStatusCard.defaultProps = defaultProps;

export default HostStatusCard;
