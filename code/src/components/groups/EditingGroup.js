import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import DragGroup        from './DragGroup';
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
  handleColor: Colors.White
};

class EditingGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: props.order,
    }

    this.awaitSetState = this.awaitSetState.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  async awaitSetState(stateProps) {
    await this.setState({
      ...this.state,
      ...stateProps
    })
  }

  componentDidUpdate(prevProps) {

    if (prevProps.children !== this.props.children) {

      this.awaitSetState({
        order: this.props.order
      });
    }
  }

  async onDragEnd(items) {
    const newOrder = items.map((item) => item.id);

    await this.setState({
      ...this.state,
      order: newOrder
    });

    this.props.onDragEnd && this.props.onDragEnd(newOrder);
  }

  render() {

    const size = {
      extraSmall: this.props.extraSmall,
      small: this.props.small,
      medium: this.props.medium,
      large: this.props.large,
      extraLarge: this.props.extraLarge
    }

    const items = React.Children.map(this.props.children, (child, index) => {
      return {
        id: `${child.props.id}`,
        content: child
      }
    })

    if (this.state.order.length !== this.props.order.length) {
      return (
      <Group {...size}/>)
    }


    return (

      <Group {...size}>
        <DragGroup {...size} handleColor={this.props.handleColor}
                   items={this.state.order.map(i => items.find(item => item.id === i))}
                   onDragEnd={this.onDragEnd}/>
        {React.cloneElement(this.props.addItem, {...size})}
      </Group>

    )
  }
}

EditingGroup.propTypes = propTypes;
EditingGroup.defaultProps = defaultProps;

export default EditingGroup;
