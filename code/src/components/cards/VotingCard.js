import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import { Jumbo }        from '../theme/Jumbo';

import MultipleChoiceGroup      from '../options/MultipleChoiceGroup';
import SingleChoiceGroup      from '../options/SingleChoiceGroup';

import Card             from './Card';
import Button           from '../buttons/Button';
import SubmitButton           from '../buttons/SubmitButton';
import InputOption       from '../options/InputOption';
import TextOption from '../options/TextOption';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};

const defaultProps = {
  title: 'Poll Title',
  description: 'Poll description is very informative...'
}

const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px`}
  ${({medium}) => medium && `padding-bottom: 26px`}
  ${({large}) => large && `padding-bottom: 32px`}
`;
//
// const CenterWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;
//
// const renderTitle = (props) => {
//
//   const { title, small, medium, large } = props;
//
//   return (
//     <ComponentWrapper small={small} medium={medium} large={large}>
//       <Jumbo threeExtraSmall={small} twoExtraSmall={medium}
//              extraSmall={large} color={Colors.Blue}>
//         {title}
//       </Jumbo>
//     </ComponentWrapper>
//   )
// };
//
// const renderDescription = (props) => {
//
//   const { description, small, medium, large } = props;
//
//   return (
//     <ComponentWrapper small={small} medium={medium} large={large}>
//       <Body small={small} medium={medium}
//             large={large} color={Colors.Black}>
//         {description}
//       </Body>
//     </ComponentWrapper>
//   )
// };
//
// const renderButton = (props) => {
//
//   const { small, medium, large,
//           handleSubmit, unselected, submit, submitted, resubmit } = props;
//
//   let width;
//
//   if (large) { width = 175}
//   else if ( small ) { width = 125 }
//   else { width = 150 }
//
//   let text;
//   let color;
//   if (submit) {
//     text = 'SUBMIT';
//     color = Colors.Yellow;
//   }
//   else if (submitted) {
//     text='SUBMITTED';
//     color = Colors.Green;
//   }
//   else if (resubmit) {
//     text = 'RESUBMIT';
//     color = Colors.Yellow;
//   }
//   else { text='ERROR';
//          color = Colors.Red;};
//
//   if (unselected) { color = Colors.Red };
//
//   return(
//     <ComponentWrapper small={small} medium={medium} large={large}>
//       <CenterWrapper>
//         <Button onClick={handleSubmit} disabled={unselected || submitted}
//                 small={small} medium={medium} large={large}
//                 width={width} backgroundColor={color}>
//           {text}
//         </Button>
//       </CenterWrapper>
//     </ComponentWrapper>
//   )
// };
//
// const renderOptions = (props) => {
//
//   const { handleOptionClick, selectedBubble, options, small, medium, large } = props;
//   // <OptionGroup handleOptionClick={handleOptionClick} selectedBubble={selectedBubble}
//   //              small={small} medium={medium} large={large}
//   //              options={options} backgroundColor={Colors.Blue} borderColor={Colors.Blue}
//   //              textColor={Colors.black}/>
//
//   return (
//     <ComponentWrapper small={small} medium={medium} large={large}>
//
//     </ComponentWrapper>
//   )
// };
//
// const renderText = (props) => {
//
//   const { small, medium, large,
//           handleSubmit, unselected, submit, submitted, resubmit } = props;
//
//   let text;
//   if (unselected) {
//     text = 'Please make a selection.'
//   }
//   else if (submit) {
//     text = 'Please press submit to record your response.';
//   }
//   else if (submitted) {
//     text='Your response has been recorded.';
//   }
//   else if (resubmit) {
//     text = 'Press submit to resubmit your response.';
//   }
//   else { text='There has been an error.';};
//
//   return(
//     <CenterWrapper>
//       <Body extraSmall={small} small={medium} medium={large} color={Colors.Black}>
//         {text}
//       </Body>
//     </CenterWrapper>
//   )
// }

class VotingCard extends React.Component {

  constructor(props) {
    super(props);

    let selectedOptions = null;
    let submittedOptions = null
    if (this.props.type === 'multiplechoice') {
      selectedOptions = Array(this.props.options.length).fill(false);
      submittedOptions = Array(this.props.options.length).fill(false);  }

    this.state = { options: this.props.options,
                   submittedOptions: submittedOptions,
                   selectedOptions: selectedOptions};

    this._renderTitle = this._renderTitle.bind(this);
    this._renderDescription = this._renderDescription.bind(this);

    this._updateSelected = this._updateSelected.bind(this);
    this._inputHandler= this._inputHandler.bind(this);
    this._renderOptions = this._renderOptions.bind(this);
    this._renderOptionGroup = this._renderOptionGroup.bind(this);

    this._checkStatus = this._checkStatus.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._renderSubmitButton = this._renderSubmitButton.bind(this);
  };

  _renderTitle = () => {

    const { title, small, medium, large } = this.props;

    return (
      <ComponentWrapper small={small} medium={medium} large={large}>
        <Jumbo threeExtraSmall={small} twoExtraSmall={medium}
               extraSmall={large} color={Colors.Blue}>
          {title}
        </Jumbo>
      </ComponentWrapper>
    )
  };

  _renderDescription = () => {

    const { description, small, medium, large} = this.props;

    return (
      <ComponentWrapper small={small} medium={medium} large={large}>
        <Body small={small} medium={medium}
              large={large} color={Colors.Black}>
          {description}
        </Body>
      </ComponentWrapper>
    )
  };

  async _updateSelected( selectedOptions ){

    await this.setState({...this.state,
                   selectedOptions: selectedOptions});
    console.log(this.state)

  };

  _inputHandler = (event, index) => {

    let newOptions = this.state.options;
    const newOption = {...newOptions[index],
                       value: event.target.value};
    newOptions[index] = newOption;

    this.setState({...this.state,
                   options: newOptions});
  };

  _renderOptions = () => {

    const options = this.state.options.map((item, index) => {
      const { type, value } = item;

      if (type == 'input') {
        return (
          <InputOption onChange={(event) => this._inputHandler(event, index)}/>
        );
      };

      return (
        <TextOption>
          {value}
        </TextOption>
      );
    });

    return options;
  }

  _renderOptionGroup = () => {


    const options = this._renderOptions();

    if (this.props.type === 'multiplechoice'){
    return (
        <ComponentWrapper {...this.props}>
          <MultipleChoiceGroup buttonType={'checkbox'} color={Colors.Blue} updateSelected={this._updateSelected} medium>
            {options}
          </MultipleChoiceGroup>
        </ComponentWrapper>
    );}
    else {
      return (
          <ComponentWrapper {...this.props}>
            <SingleChoiceGroup color={Colors.Blue} updateSelected={this._updateSelected} medium>
              {options}
            </SingleChoiceGroup>
          </ComponentWrapper>
      );}
  };

  _checkStatus = () => {

    let selected = false;

    if (this.props.type === 'multiplechoice') {
      let i;
      for (i = 0; i < this.state.selectedOptions.length; i++) {
        if (this.state.selectedOptions[i]) {
          selected = true;
          break;
        }
      }
    }
    else { if (this.state.selectedOptions != null) { selected = true; }}


    let submitted = false;

    if (this.props.type === 'multiplechoice') {
      let i;
      for (i = 0; i < this.state.submittedOptions.length; i++) {
        if (this.state.submittedOptions[i]) {
          submitted = true;
          break;
        }
      }
    }
    else { if (this.state.submittedOptions != null) { submitted = true; }}


    let resubmit = false;

    console.log('test')
    if ((this.props.type === 'multiplechoice') && submitted) {
      let i;
      for (i = 0; i < this.state.selectedOptions.length; i++) {
        if (this.state.selectedOptions[i] != this.state.submittedOptions[i]){
          resubmit = true;
          break;
        }
      }
    }
    else if (submitted){
      console.log(this.state.submittedOptions)
      console.log(this.state.selectedOptions)
      resubmit = (this.state.submittedOptions != this.state.selectedOptions);
    }

    console.log({resubmit, submitted, selected})

    if ( resubmit && selected ) { return { resubmit: resubmit }}
    else if ( submitted ) { return { submitted: submitted }}
    else if ( selected ) { return { selected: selected }}
    else { return {} }

  }

  async _handleSubmit( event ) {

    let selectedOptions;
    if (this.props.type === 'multiplechoice'){
      selectedOptions = this.state.selectedOptions.map((item) => item);}
    else {  selectedOptions = this.state.selectedOptions }

    await this.setState({...this.state,
                   submittedOptions: selectedOptions});

    console.log(this.state)
  }

  _renderSubmitButton = () => {

    const { selected, submitted, resubmit } = this._checkStatus();

    const unselected = !selected && !submitted && !resubmit;
    const submit = selected && !submitted && !resubmit;

    console.log({ unselected, submit, submitted, resubmit } )

    return (
      <SubmitButton unselected={unselected} submit={submit}
                    submitted={submitted} resubmit={resubmit}
                    {...this.props} onClick={this._handleSubmit}/>
    )

  }


  render() {

      return (
        <Card width={500}>
          {this._renderTitle()}
          {this._renderDescription()}
          {this._renderOptionGroup()}
          {this._renderSubmitButton()}
        </Card>
      )
    // const { extraLarge, large, medium, small, extraSmall } = this.props;
    //
    // let size;
    //
    // if (extraLarge) { size = sizeConfig.extraLarge }
    // else if (large) { size = sizeConfig.large }
    // else if (small) { size = sizeConfig.small }
    // else if (extraSmall) { size = size.extraSmall }
    // else { size = sizeConfig.medium }
    //
    // return(this.state.clicked ? this._renderClicked(size) : this._renderUnClicked(size));
  }
}


// const VotingCard = (props) => {
//
//   const { width } = props;
//
//   return (
//     <Card width={width}>
//       {renderTitle(props)}
//       {renderDescription(props)}
//       {renderOptions(props)}
//       {renderButton(props)}
//       {renderText(props)}
//     </Card>
//   )
//
// };

VotingCard.propTypes = PropTypes;
VotingCard.defaultProps = defaultProps;

export default VotingCard;
