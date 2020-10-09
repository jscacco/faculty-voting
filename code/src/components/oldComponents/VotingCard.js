import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { connect } from 'react-redux';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import { Jumbo }        from '../theme/Jumbo';

import VotingCardBase       from './VotingCardBase';

import OptionGroup      from '../options/OptionGroup';

import SubmitButton           from '../buttons/SubmitButton';

import InputOption       from '../options/InputOption';
import TextOption from '../options/TextOption';

const propTypes = {

  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};

const defaultProps = {
  title: 'Poll Title',
  description: 'Poll description is very informative...'
};

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: auto;
`;

const VotingCard = ( props ) => {

  console.log(props);

  const renderOptions = () => {

    return props.options.map((item, index) => {
      const { type, value } = item;

      if (type === 'input' || type === 'textarea') {
        return (
          <InputOption inputType={type} onChange={(event) => console.log('Input Change')}/>
        );
      };

      return (
        <TextOption>
          {value}
        </TextOption>
      );
    });
  };

  const renderOptionGroup = () => {

    const options = renderOptions();
    console.log(options);

    return (
        <OptionGroup type={props.type}
                     color={Colors.Blue}
                     submission={props.submission}
                     updateSelected={props.onSelectOption}
                     small={props.small}
                     medium={props.medium}
                     large={props.large}>
          {options}
        </OptionGroup>
    );
  };

  const checkStatus = () => {

    console.log(props.submission);
    console.log(props.selected);

    let selected = false;
    let submitted = false;
    let resubmit = false;

    let i;
    for (i = 0; i < props.selected.length; i++) {

      if (selected && submitted && resubmit) { break; }

      if (props.selected[i]) {
        selected = true;
      }
      if (props.submission && props.submission[i]){
      // if (this.state.submittedOptions[i]){
        submitted = true;
      }
      if (props.submission && (props.submission[i] != props.selected[i])) {
      // if (this.state.submittedOptions[i] != this.state.selectedOptions[i]) {
        resubmit = true;
      }
    }

    if ( resubmit && selected && submitted) { return { resubmit: resubmit } }
    else if ( submitted ) { return { submitted: submitted } }
    else if ( selected ) { return { selected: selected } }
    else { return {} }

  };

  const renderSubmitButton = () => {

    const { selected, submitted, resubmit } = checkStatus();

    const unselected = !selected && !submitted && !resubmit;
    const submit = selected && !submitted && !resubmit;

    return (
      <SubmitButton unselected={unselected}
                    submit={submit}
                    submitted={submitted}
                    resubmit={resubmit}
                    {...props}
                    onClick={() => props.onSubmitPoll(0, props.selected)}/>
    );
  };

  return (
    <VotingCardBase {...props}>
        {renderOptionGroup()}
        {renderSubmitButton()}
    </VotingCardBase>
  )
}

const mapStateToProps = (state) => {

  return {
    submission: state.poll.submission,
    selected: state.poll.selected,
    loading: state.poll.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitPoll: (poll_id, submission) => dispatch({ type: 'SUBMIT_POLL_START',
                                                      poll_id,
                                                      submission }),
    onSelectOption: ( selection ) => dispatch({ type: 'UPDATE_SELECTED_OPTIONS',
                                                selection })
  }
}
//
export default connect(mapStateToProps, mapDispatchToProps)(VotingCard);



// class VotingCard extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     let selectedOptions = Array(this.props.options.length).fill(false);
//     let submittedOptions = Array(this.props.options.length).fill(false);
//
//     this.state = { options: this.props.options,
//                    submittedOptions: submittedOptions,
//                    selectedOptions: selectedOptions};
//
//     this._updateSelected = this._updateSelected.bind(this);
//     this._updateInput = this._updateInput.bind(this);
//
//     this._inputHandler= this._inputHandler.bind(this);
//     this._renderOptions = this._renderOptions.bind(this);
//     this._renderOptionGroup = this._renderOptionGroup.bind(this);
//
//     this._checkStatus = this._checkStatus.bind(this);
//     this._handleSubmit = this._handleSubmit.bind(this);
//     this._renderSubmitButton = this._renderSubmitButton.bind(this);
//   };
//
//   async _updateSelected( selectedOptions ){
//
//     await this.setState({ ...this.state,
//                           selectedOptions: selectedOptions });
//
//   };
//
//   async _updateInput ( newOptions ) {
//
//     await this.setState({ ...this.state,
//                           options: newOptions });
//
//   };
//
//   _inputHandler = (event, index) => {
//
//     const newOptions = this.state.options.map((item) => item );
//     const newOption = { ...newOptions[index],
//                         value: event.target.value};
//     newOptions[index] = newOption;
//
//     this._updateInput(newOptions);
//   };
//
//   _renderOptions = () => {
//
//     const options = this.state.options.map((item, index) => {
//       const { type, value } = item;
//
//       if (type === 'input' || type == 'textarea') {
//         return (
//           <InputOption inputType={type} onChange={(event) => this._inputHandler(event, index)}/>
//         );
//       };
//
//       return (
//         <TextOption>
//           {value}
//         </TextOption>
//       );
//     });
//
//     return options;
//   }
//
//   _renderOptionGroup = () => {
//
//     const options = this._renderOptions();
//
//     return (
//         <OptionGroup type={this.props.type}
//                              color={Colors.Blue}
//                              updateSelected={this._updateSelected}
//                              small={this.props.small}
//                              medium={this.props.medium}
//                              large={this.props.large}>
//           {options}
//         </OptionGroup>
//     );
//   };
//
//   _checkStatus = () => {
//
//     // console.log(this.props.submitted);
//
//     let selected = false;
//     let submitted = false;
//     let resubmit = false;
//
//     let i;
//     for (i = 0; i < this.state.selectedOptions.length; i++) {
//
//       if (selected && submitted && resubmit) { break; }
//
//       if (this.state.selectedOptions[i]) {
//         selected = true;
//       }
//       if (this.state.submittedOptions && this.state.submittedOptions[i]){
//       // if (this.state.submittedOptions[i]){
//         submitted = true;
//       }
//       if (this.state.submittedOptions && (this.state.submittedOptions[i] != this.state.selectedOptions[i])) {
//       // if (this.state.submittedOptions[i] != this.state.selectedOptions[i]) {
//         resubmit = true;
//       }
//     }
//
//     if ( resubmit && selected && submitted) { return { resubmit: resubmit } }
//     else if ( submitted ) { return { submitted: submitted } }
//     else if ( selected ) { return { selected: selected } }
//     else { return {} }
//
//   };
//
//   async _handleSubmit( event ) {
//
//     let selectedOptions = this.state.selectedOptions.map((item) => item);
//
//     await this.setState({ ...this.state,
//                           submittedOptions: selectedOptions });
//     console.log(selectedOptions);
//
//     if (this.props.onSubmit) { this.props.onSubmit(this.state.selectedOptions); }
//
//     // if (this.props.getVote) {this.props.getVote({...this.state})}
//
//   };
//
//   _renderSubmitButton = () => {
//
//     console.log(this.props);
//
//     const { selected, submitted, resubmit } = this._checkStatus();
//
//     const unselected = !selected && !submitted && !resubmit;
//     const submit = selected && !submitted && !resubmit;
//
//     return (
//       <SubmitButton unselected={unselected}
//                     submit={submit}
//                     submitted={submitted}
//                     resubmit={resubmit}
//                     {...this.props}
//                     onClick={this._handleSubmit}/>
//     );
//   };
//
//   render() {
//       return (
//         <VotingCardBase {...this.props}>
//           {this._renderOptionGroup()}
//           {this._renderSubmitButton()}
//         </VotingCardBase>
//       );
//   };
// };
//
// VotingCard.propTypes = propTypes;
// VotingCard.defaultProps = defaultProps;
//
// export default VotingCard;
