import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Jumbo            from '../theme/Jumbo';

import VotingCard       from './VotingCard';


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
};

class SngleVoteCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = { options: this.props.options,
                   submittedOptions: null,
                   selectedOptions: null};

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

    await this.setState({...this.state,
                   selectedOptions: selectedOptions});

  };

  async _updateInput ( newOptions ) {

    await this.setState({ ...this.state,
                          options: newOptions });

  };

  _inputHandler = (event, index) => {

    let newOptions = this.state.options;
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
        console.log('here')
        return (
          <InputOption onChange={(event) => this._inputHandler(event, index)}
                       inputType={'textarea'} />
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
        <SingleChoiceGroup color={Colors.Blue}
                           updateSelected={this._updateSelected}
                           small={this.props.small}
                           medium={this.props.medium}
                           large={this.props.large}>
          {options}
        </SingleChoiceGroup>
    );
  };

  _checkStatus = () => {

    const selected = this.state.selectedOptions != null;
    const submitted = this.state.submittedOptions != null;
    const resubmit = (this.state.submittedOptions != this.state.selectedOptions);

    if ( resubmit && selected && submitted ) { return { resubmit: resubmit }}
    else if ( submitted ) { return { submitted: submitted }}
    else if ( selected ) { return { selected: selected }}
    else { return {} }

  };

  async _handleSubmit( event ) {

    await this.setState({ ...this.state,
                          submittedOptions: this.state.selectedOptions });
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
    )

  }


  render() {

      return (
        <VotingCard {...this.props}>
          {this._renderOptionGroup()}
          {this._renderSubmitButton()}
        </VotingCard>
      )
  }
};

SngleVoteCard.propTypes = PropTypes;
SngleVoteCard.defaultProps = defaultProps;

export default SngleVoteCard;
