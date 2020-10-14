import React                  from "react";
import styled                 from 'styled-components';
import PropTypes              from 'prop-types';
import ExtraPropTypes         from 'react-extra-prop-types';

import { Draggable }          from 'react-beautiful-dnd';

import Icon                   from '../theme/Icon';

const propTypes = {
  item: PropTypes.object,
  index: PropTypes.int,

  handleColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool
}

const defaultProps = {

};

const DraggableItem = styled.div `
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-bottom: ${({padding}) => padding}px;
`;

const ItemWrapper = styled.div`
  width: 100%;
`;

const DragHandle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${({padding}) => padding}px;
`;

const DragItem = ( props ) => {

  const { item, index, handleColor, ...rest } = props;

  let padding;
  if ( props.extraSmall ) { padding = 10}
  else if ( props.small ) { padding = 10 }
  else if ( props.large ) { padding = 18 }
  else if ( props.extraLarge ) { padding = 22 }
  else { padding = 14 }

  return (
    <Draggable draggableId={item.id} index={index}>
      { ( provided ) => (
        <DraggableItem padding={padding}
                       {...provided.draggableProps}
                       ref={provided.innerRef}>
          <DragHandle {...provided.dragHandleProps}
                      padding={padding}>
            <Icon type={'dragHandle'} color={handleColor}
                  small={props.extraSmall} medium={props.small}
                  large={props.medium} extraLarge={props.large}
                  twoExtraLarge={props.extraLarge}/>
          </DragHandle>
          <ItemWrapper>
            {React.cloneElement(item.content, {...rest})}
          </ItemWrapper>
        </DraggableItem>
      )}
    </Draggable>
  )
};

DragItem.propTypes = propTypes;
DragItem.defaultProps = defaultProps;

export default DragItem;
