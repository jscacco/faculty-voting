import React                  from "react";
import styled                 from 'styled-components';
import PropTypes              from 'prop-types';
import ExtraPropTypes         from 'react-extra-prop-types';
import { DragDropContext,
         Droppable }          from "react-beautiful-dnd";

import DragItem               from './DragItem';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  onDragEnd: PropTypes.func,

  handleColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool
}

const defaultProps = {
  items: []
}

const DropContainer = styled.div`
  width: auto;
`;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class InnerList extends React.Component {

  shouldComponentUpdate (nextProps) {
    if (nextProps.items === this.props.items) {
      return false;
    }
    return true;
  }

  render () {
    return (
      this.props.items.map((item, index) =>
        <DragItem key={item.id}
                  item={item}
                  index={index}
                  handleColor={this.props.handleColor}
                  {...this.props.size}/>)
    )
  }
}

class DragGroup extends React.Component {

  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);

  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );

    this.props.onDragEnd && this.props.onDragEnd(items);
  }

  render() {

    const { extraSmall, small, medium, large, extraLarge } = this.props;

    const size = {
      extraSmall: extraSmall,
      small: small,
      medium: medium,
      large: large,
      extraLarge: extraLarge
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          { provided => (
            <DropContainer ref={provided.innerRef}
                           {...provided.droppableProps}>
              <InnerList items={this.props.items}
                         handleColor={this.props.handleColor}
                         size={size}/>
              {provided.placeholder}
            </DropContainer>
          )}
        </Droppable>
      </DragDropContext>
    )
  };
};

DragGroup.propTypes = propTypes;
DragGroup.defaultProps = defaultProps;

export default DragGroup;
