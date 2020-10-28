import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import StatusText       from '../format-text/StatusText';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';

import Group            from '../groups/Group';
import TextOption       from '../options/TextOption';

import Card             from './Card';


const propTypes = {
  // pollStatus: PropTypes.string,
  //
  // updateStatus: PropTypes.func,

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
  padding
`;

const SectionHeadingWrapper = styled.div`
  padding-bottom: 10px;
`;

const ContentWrapper = styled.div`
  padding-bottom: 10px
`;

const PanelHeader = ( props ) => {

  return (
    <HeadingWrapper>
      <Jumbo fiveExtraSmall={props.extraSmall} fourExtraSmall={props.small}
             threeExtraSmall={props.medium} twoExtraSmall={props.large}
             extraSmall={props.extraLarge} color={Colors.Blue}>
        QUICK POLL
      </Jumbo>
    </HeadingWrapper>
  )
}

const StatusButton = ( props ) => {

  const { status, onClick, size, ...rest } = props;

  let text;
  let color;
  let newStatus;

  if ( status === 'closed') {
    text = 'CLEAR';
    color = Colors.Yellow;
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
// () => onClick(newStatus)
  return (
    <Button backgroundColor={color} onClick={onClick}
            {...size}>
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
      { React.Children.map(children, item => {
        return (
          <ContentWrapper>
            {item}
          </ContentWrapper>
        )
      })}
      <StatusButton status={status} onClick={onStatusClick} size={size}/>
    </SectionWrapper>
  )
}

class QuickPoll extends React.Component {

  constructor(props) {
    super(props)

    this.size = {
      extraSmall: props.extraSmall,
      small: props.small,
      medium: props.medium,
      large: props.large,
      extraLarge: props.extraLarge
    }

    this.state = {
      status: 'pending',
      description: '',

    }

    this.updateDescription = this.updateDescription.bind(this);
  }

  async updateDescription(event) {
    await this.setState({
      ...this.state,
      description: event.target.value
    })

    console.log(this.state)
  }

  render () {
    return (
      <Card medium>
        <PanelHeader {...this.size}/>
        <PanelSection status={this.state.status} onStatusClick={this.props.onStatusClick} size={this.size}>
          <Input type={'textarea'} value={this.state.description} onChange={this.updateDescription}
                 placeholder={'Description'} {...this.size}/>
          <Group iconColor={Colors.Blue} {...this.size}>
            <TextOption> Yes </TextOption>
            <TextOption> No </TextOption>
            <TextOption> Abstain </TextOption>
          </Group>
        </PanelSection>
      </Card>
    )
  }
}

// const QuickPoll = ( props ) => {
//
//   const size = {
//     extraSmall: props.extraSmall,
//     small: props.small,
//     medium: props.medium,
//     large: props.large,
//     extraLarge: props.extraLarge
//   }
//
//   return (
//     <Card medium>
//       <PanelHeader {...size}/>
//       <PanelSection status={props.pollStatus} onStatusClick={props.onStatusClick} size={size}>
//         <Input type={'textarea'} value={this.description} placeholder={'Description'} {...size}/>
//       </PanelSection>
//     </Card>
//   )
// }

QuickPoll.propTypes = propTypes;
QuickPoll.defaultProps = defaultProps;

export default QuickPoll;
