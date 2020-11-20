import React            from 'react';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';

import Input            from '../inputs/Input';
import TertiaryCard      from '../format-cards/TertiaryCard';
import EditButton       from '../buttons/EditButton';
import EditingGroup     from '../groups/EditingGroup';
import AddItem          from '../items/AddItem';
import HostEditPollOptionItem from '../items/HostEditPollOptionItem'

const propTypes = {
  pollData: PropTypes.object,

  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  onOptionChange: PropTypes.func,

  onEditClick: PropTypes.func,
  onAddClick: PropTypes.func,
  onDragEnd : PropTypes.func,

  iconColor: ExtraPropTypes.color,
  fontColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
};


const Header = ( props ) => (
  <Input label={'Title'} type={'inputfield'}
         value={props.title} fontColor={Colors.Charcol}
         onChange={props.onChange}
         {...props.size}/>
)

const HeaderButton = (props) => (
  <EditButton type={'save'} color={Colors.Blue} onClick={props.onClick} {...props.size}/>
)

const Description = ( props ) => (
  <Input label={'Description'} type={'textarea'}
         value={props.description} fontColor={Colors.Charcol}
         onChange={props.onChange}
         {...props.size}/>
)

const AddComponent = ( props ) => {
  return (
    <AddItem onClick={props.onAddClick} textColor={Colors.Blue} iconColor={Colors.Blue} {...props.size}>
      Add new option
    </AddItem>
  )
}

const EditPollCard = ( props ) => {

  const { pollData, onEditClick, onAddClick, onDeleteClick, onDragEnd,
          onTitleChange, onDescriptionChange, onOptionChange, ...rest } = props;

  const { title, description } = pollData;

  const size = {
    extraSmall: props.extraSmall,
    small: props.small,
    medium: props.medium,
    large: props.large,
    extraLarge: props.extraLarge
  }


  const renderOptionGroup = () => {
    let optionsOrder = pollData.optionsOrder || [];

    const optionComponents = optionsOrder.map(id => {

      return(
          <HostEditPollOptionItem id={id} type={'inputfield'}
                                  value={pollData.options[id].value}
                                  onChange={(event) => onOptionChange(id, event)}
                                  onDelete={() => onDeleteClick(id)}
                                  fontColor={Colors.Charcol}
                                  iconColor={Colors.Blue}
                                  {...size}/>
      )
    });

    return (
      <EditingGroup order={pollData.optionsOrder}
                    addItem={<AddComponent onAddClick={onAddClick} size={size}/>}
                    onDragEnd={onDragEnd}
                    handleColor={Colors.Blue} {...rest}>
        {optionComponents}
      </EditingGroup>
    );
  }

  const sections = [{content: <Description description={description} onChange={onDescriptionChange} size={size}/>},
                    {content: renderOptionGroup()}]

  return (
    <TertiaryCard {...rest}
                   width={'100%'}
                   height={size.extraSmall ? `100%` : `stretch`}
                   cardColor={Colors.White}
                   headerComponent={<Header onChange={onTitleChange} title={title} size={size}/>}
                   headerButton={<HeaderButton onClick={onEditClick}  size={size}/>}
                   sections={sections} />
  )
};

EditPollCard.propTypes = propTypes;
EditPollCard.defaultProps = defaultProps;

export default EditPollCard;
