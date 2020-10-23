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
import OptionGroup      from '../option-groups/OptionGroup';


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
      <Jumbo threeExtraSmall color={Colors.Blue}>
        SETTINGS
      </Jumbo>
    </HeadingWrapper>
  )
}

const PanelSection = ( props ) => {

  const { title, children, ...rest } = props;

  return (
    <SectionWrapper>
      <SectionHeadingWrapper>
        <Body medium color={Colors.Blue}>
          {title}
        </Body>
      </SectionHeadingWrapper>
      {children}
    </SectionWrapper>
  )
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

  // const onTypeChange = (selection) {
  //
  // }

  render () {
    return (
      <Card medium>
        <PanelHeader/>
        <PanelSection title={'POLL TYPE'}>
          <Group medium>
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
        <PanelSection title={'OTHER'}>
          <OptionGroup type={'multiple'}
                       selectedOptions={this.state.otherSelection}
                       onSelect={this.onOtherClick} medium>
            <TextOption id={'0'}>
              Display results
            </TextOption>
            <TextOption id={'1'}>
              Input option
            </TextOption>
          </OptionGroup>
        </PanelSection>
      </Card>
    )
  }
}

export default HostEditPanelCard;
