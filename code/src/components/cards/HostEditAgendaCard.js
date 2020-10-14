import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import PollData          from '../../data-containers/PollData';

import { Colors }        from '../theme/Colors';
import EditButton             from '../buttons/EditButton';
import StatusSecondaryCard from '../format-cards/StatusSecondaryCard';

import Group              from '../groups/Group';
import EditingGroup                 from '../groups/EditingGroup';
import EditItem                  from '../items/EditItem';
import AddItem                  from '../items/AddItem';
import HostEditAgendaItem                  from '../items/HostEditAgendaItem';


const propTypes = {

  roomTitle: PropTypes.string,

  openPolls: PropTypes.arrayOf(PropTypes.object),
  pendingPolls: PropTypes.arrayOf(PropTypes.object),
  closedPolls: PropTypes.arrayOf(PropTypes.object),

  onViewClick: PropTypes.func,
  onEditClick: PropTypes.func,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  roomTitle: 'Agenda',
  openPolls: [],
  pendingPolls: [],
  closedPolls: []
};

const SectionGroup = ( props ) => {
  const { polls, onViewClick, ...rest } = props;

  return (
    <Group {...rest}>
      { polls.map((poll, index) => (
        <HostEditAgendaItem text={poll.title} buttonText={'VIEW'} onClick={onViewClick}/>
      )) }
    </Group>
  )
}

class HostEditAgendaCard extends React.Component {

  constructor(props){
    super(props);

    this.size = {
      extraSmall: props.extraSmall,
      small: props.small,
      medium: props.medium,
      large: props.large,
      extraLarge: props.extraLarge
    }

    this.sections = [
      { status: 'pending',
        content: undefined },
      { status: 'open',
        content: <SectionGroup polls={props.openPolls} onViewClick={props.onViewClick} {...this.size}/> },
      { status: 'closed',
        content: <SectionGroup polls={props.closedPolls} onViewClick={props.onViewClick} {...this.size}/> },
    ]

    this.state = {
      pendingPolls: props.pendingPolls,
      pendingOrder: props.pendingOrder
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

  }

  async onDelete( index ){
    let newPendingPolls = this.state.pendingPolls.map(item => item);
    newPendingPolls.splice(index, 1);

    let newPendingOrder = this.state.pendingOrder.filter((i) => i != index);
    newPendingOrder = newPendingOrder.map((i) => i > index ? i - 1 : i)

    await this.setState({
      ...this.state,
      pendingPolls: newPendingPolls,
      pendingOrder: newPendingOrder
    })
  }

  async onAdd() {
    const newPoll = PollData;
    const newPendingPolls = this.state.pendingPolls.map(item => item);
    newPendingPolls.push(newPoll)

    const newPendingOrder = this.state.pendingOrder.map(item => item);
    newPendingOrder.push(newPendingPolls.length - 1);

    await this.setState({
      ...this.state,
      pendingPolls: newPendingPolls,
      pendingOrder: newPendingOrder
    })
  }

  async onDragEnd(newOrder) {
    await this.setState({
      ...this.state,
      pendingOrder: newOrder
    })
  }

  addPollComponent = (
    <AddItem onClick={() => this.onAdd(this)} textColor={Colors.White} iconColor={Colors.White}>
      Add new poll
    </AddItem>
  )


  render() {

    const pendingContent = (
      <EditingGroup addItem={this.addPollComponent} order={this.state.pendingOrder}
                    onDragEnd={this.onDragEnd}
                    {...this.size}>
        {this.state.pendingPolls.map((poll, index) => (
          <EditItem onDelete={() => this.onDelete(index)} iconColor={Colors.White}>
            <HostEditAgendaItem text={poll.title} buttonText={'EDIT'} onClick={this.props.onEditClick}/>
          </EditItem>
        ))}
      </EditingGroup>
    )

    this.sections[0].content = pendingContent;

    const headerButton = (
      <EditButton type={'save'} color={Colors.White} onClick={this.props.onEditClick}/>
    )

    return (
      <StatusSecondaryCard header={this.props.roomTitle}
                           headerButton={headerButton}
                           sections={this.sections}
                           {...this.size}/>
    )
  }
}

HostEditAgendaCard.propTypes = propTypes;
HostEditAgendaCard.defaultProps = defaultProps;

export default HostEditAgendaCard;
