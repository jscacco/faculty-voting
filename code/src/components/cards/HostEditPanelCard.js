import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import Card             from './Card';
import TextOption       from '../options/TextOption';
import Group            from '../groups/Group';
import OptionGroup      from '../groups/OptionGroup';

const propTypes = {
  pollType: PropTypes.string,
  showResults: PropTypes.bool,
  userInputOption: PropTypes.bool,

  updateSettings: PropTypes.func,

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

const HorizontalContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
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
        SETTINGS
      </Jumbo>
    </HeadingWrapper>
  )
}

const PanelSection = ( props ) => {

  const { title, children, size, ...rest } = props;

  return (
    <SectionWrapper>
      <SectionHeadingWrapper>
        <Body {...size} color={Colors.Blue}>
          {title}
        </Body>
      </SectionHeadingWrapper>
      {children}
    </SectionWrapper>
  )
}

const PanelContent = ( props ) => {

  return props.extraSmall ?
    <HorizontalContentWrapper>
      {props.children}
    </HorizontalContentWrapper> : props.children;
}

class HostEditPanelCard extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      typeSelection: {
        '0': props.pollType === 'single',
        '1': props.pollType === 'multiple'
      },
      otherSelection: {
        '0': props.showResults || false,
        '1': props.userInputOption || false,
      }
    }

    this.updateSettings = this.updateSettings.bind(this)
    this.onTypeClick = this.onTypeClick.bind(this);
    this.onOtherClick = this.onOtherClick.bind(this);
  }

  updateSettings = () => {
    const type = this.state.typeSelection['0'] ? 'single' : 'multiple';
    const showResults = this.state.otherSelection['0'];
    const userInputOption = this.state.otherSelection['1'];

    console.log(this.state)
    this.props.updateSettings && this.props.updateSettings({type, showResults, userInputOption})
  }

  async onTypeClick(id) {
    if (!this.state.typeSelection[id]) {
      await this.setState({
        ...this.state,
        typeSelection: {
          '0': id === '0',
          '1': id === '1'
        }
      })
    }

    this.updateSettings();
  }

  async onOtherClick( selection ) {
    await this.setState({
      ...this.state,
      otherSelection: selection
    })

    this.updateSettings();
  }

  render () {
    const size = {
      extraSmall: this.props.extraSmall,
      small: this.props.small,
      medium: this.props.medium,
      large: this.props.large,
      extraLarge: this.props.extraLarge
    }

    return (
      <Card borderMedium>
        <PanelHeader {...size}/>
        <PanelContent {...size}>
          <PanelSection title={'POLL TYPE'} size={size}>
            <Group {...size}>
              <TextOption id={'0'} iconType={'bubble'} iconColor={Colors.Blue}
                          clicked={this.state.typeSelection['0']} onClick={() => this.onTypeClick('0')}>
                Single choice
              </TextOption>
              <TextOption id={'1'} iconType={'bubble'} iconColor={Colors.Blue}
                          clicked={this.state.typeSelection['1']} onClick={() => this.onTypeClick('1')}>
                Multiple choice
              </TextOption>
            </Group>
          </PanelSection>
          <PanelSection title={'OTHER'} size={size}>
            <OptionGroup type={'multiple'}
                         selectedOptions={this.state.otherSelection}
                         onSelect={this.onOtherClick}
                         {...size}>
              <TextOption id={'0'}>
                Display results
              </TextOption>
              <TextOption id={'1'}>
                Input option
              </TextOption>
            </OptionGroup>
          </PanelSection>
        </PanelContent>
      </Card>
    )
  }
}

HostEditPanelCard.propTypes = propTypes;
HostEditPanelCard.defaultProps = defaultProps;

export default HostEditPanelCard;
