import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import { Jumbo }        from '../theme/Jumbo';

import VotingCard       from './VotingCard';

import MultipleChoiceGroup      from '../options/MultipleChoiceGroup';
import SingleChoiceGroup      from '../options/SingleChoiceGroup';

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
};


class MultiVoteCard extends React.Component {

  constructor(props) {
    super(props);

    let selectedOptions = Array(this.props.options.length).fill(false);
    let submittedOptions = Array(this.props.options.length).fill(false);

    this.state = { options: this.props.options,
                   submittedOptions: submittedOptions,
                   selectedOptions: selectedOptions};

    this._updateSelected = this._updateSelected.bind(this);
    this._updateInput = this._updateInput.bind(this);

    this._inputHandler= this._inputHandler.bind(this);
    this._renderOptions = this._renderOptions.bind(this);
    this._renderOptionGroup = this._renderOptionGroup.bind(this);

    this._checkStatus = this._checkStatus.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._renderSubmitButton = this._renderSubmitButton.bind(this);
  };

  async _updateSelected( selectedOptions ){

    await this.setState({ ...this.state,
                          selectedOptions: selectedOptions });

  };

  async _updateInput ( newOptions ) {

    await this.setState({ ...this.state,
                          options: newOptions });

  };

  _inputHandler = (event, index) => {

    const newOptions = this.state.options.map((item) => item );
    const newOption = {...newOptions[index],
                       value: event.target.value};
    newOptions[index] = newOption;

    this._updateInput(newOptions);
  };

  _renderOptions = () => {

    const options = this.state.options.map((item, index) => {
      const { type, value } = item;

      if (type === 'input') {
        return (
          <InputOption onChange={(event) => this._inputHandler(event, index)}/>
        );
      }
      else if (type === 'textarea') {
        return (
          <InputOption inputType={'textarea'} onChange={(event) => this._inputHandler(event, index)}/>
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

    return (
        <MultipleChoiceGroup buttonType={'checkbox'}
                             color={Colors.Blue}
                             updateSelected={this._updateSelected}
                             small={this.props.small}
                             medium={this.props.medium}
                             large={this.props.large}>
          {options}
        </MultipleChoiceGroup>
    );
  };

  _checkStatus = () => {

    let selected = false;
    let submitted = false;
    let resubmit = false;

    let i;
    for (i = 0; i < this.state.selectedOptions.length; i++) {

      if (selected && submitted && resubmit) { break; }

      if (this.state.selectedOptions[i]) {
        selected = true;
      }
      if (this.state.submittedOptions[i]){
        submitted = true;
      }
      if (this.state.submittedOptions[i] != this.state.selectedOptions[i]) {
        resubmit = true;
      }
    }

    if ( resubmit && selected && submitted) { return { resubmit: resubmit } }
    else if ( submitted ) { return { submitted: submitted } }
    else if ( selected ) { return { selected: selected } }
    else { return {} }

  };

  async _handleSubmit( event ) {

    let selectedOptions = this.state.selectedOptions.map((item) => item);

    await this.setState({ ...this.state,
                          submittedOptions: selectedOptions });

  };

  _renderSubmitButton = () => {

    const { selected, submitted, resubmit } = this._checkStatus();

    const unselected = !selected && !submitted && !resubmit;
    const submit = selected && !submitted && !resubmit;

    return (
      <SubmitButton unselected={unselected}
                    submit={submit}
                    submitted={submitted}
                    resubmit={resubmit}
                    {...this.props}
                    onClick={this._handleSubmit}/>
    );
  };

  render() {
      return (
        <VotingCard {...this.props}>
          {this._renderOptionGroup()}
          {this._renderSubmitButton()}
        </VotingCard>
      );
  };
};

MultiVoteCard.propTypes = propTypes;
MultiVoteCard.defaultProps = defaultProps;

export default MultiVoteCard;
