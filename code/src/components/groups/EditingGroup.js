import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import DragGroup        from './DragGroup';
import AgendaItem       from '../items/AgendaItem';
import EditItem         from '../items/EditItem';

import Group            from './Group';

const propTypes = {
  children: PropTypes.node,
  order: PropTypes.arrayOf(PropTypes.int),

  onDragEnd: PropTypes.func,
  handleColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool
};

const defaultProps = {

};

class EditingGroup extends React.Component {

  constructor(props) {
    super(props);

    this.size = {
      extraSmall: props.extraSmall,
      small: props.small,
      medium: props.medium,
      large: props.large,
      extraLarge: props.extraLarge
    }

    const items = React.Children.map(props.children, (child, index) => {
      return {
        id: `${index}`,
        index: index,
        content: child
      }
    })

    this.state = {
      items: items,
      order: props.order,
    }

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children != this.props.children) {

      const items = React.Children.map(this.props.children, (child, index) => {
        return {
          id: `${index}`,
          index: index,
          content: child
        }
      })

      this.setState({
        ...this.state,
        items: items,
        order: this.props.order
      })
    }
  }

  async onDragEnd(items) {
    const newOrder = items.map((item) => item.index);

    console.log(newOrder);

    await this.setState({
      ...this.state,
      order: newOrder
    });

    this.props.onDragEnd && this.props.onDragEnd(newOrder);
  }

  render() {
    return (

      <Group {...this.size}>
        <DragGroup {...this.size} handleColor={Colors.White}
                   items={this.state.order.map(i => this.state.items[i])}
                   onDragEnd={this.onDragEnd}/>
        {this.props.addItem}
      </Group>

    )
  }
}

export default EditingGroup;
