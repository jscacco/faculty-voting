import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo             from '../theme/Jumbo';

import Card             from './Card';
import Input            from '../inputs/Input';
import Button           from '../buttons/Button';


const propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

const defaultProps = {
  handleChange: undefined,
  handleSubmit: undefined
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

const ButtonWrapper = styled.div`
  width: 50%;
`;

const TextInputWrapper = styled.div`
  padding-bottom: ${({padding}) => padding}px;
`;

const TitleWrapper = styled.div`
  padding-bottom: ${({padding}) => padding}px;
`;

const Title = (props) => {

  const { title, extraSmall, small, medium, large, extraLarge } = props;

  let titlePadding;
  if ( extraSmall ) { titlePadding = 5; }
  else if ( small ) { titlePadding = 10; }
  else if ( large ) { titlePadding = 20; }
  else { titlePadding = 15; }

  return (
    <TitleWrapper padding={titlePadding}>
      <Jumbo twoExtraSmall={extraSmall}
             extraSmall={small}
             small={medium}
             medium={large}
             large={extraLarge}
             color={Colors.White}>
        {title}
      </Jumbo>
    </TitleWrapper>
  )
};

const CodeInput = (props) => {

  const { value, handleChange, onEnter,
          extraSmall, small, medium, large, extraLarge } = props;

  let inputPadding;
  if ( extraSmall ) { inputPadding = 10 }
  else if ( small ) { inputPadding = 15 }
  else if ( large ) { inputPadding =  25 }
  else { inputPadding = 20  }

  return (
    <TextInputWrapper padding={inputPadding}>
      <Input type={"inputfield"} value={value} fontColor={Colors.White}
             onChange={handleChange} placeholder={"Enter Room Code"}
             backgroundColor={Colors.Blue} borderColor={Colors.White}
             placeholderColor={Colors.White} maxLength={10} onKeyDown={onEnter}
             {...{extraSmall, small, medium, large, extraLarge}}/>
    </TextInputWrapper>
  )
};

const EnterButton = (props) => {

  const { extraSmall, small, medium, large, extraLarge, handleSubmit } = props;

  return(
    <ButtonWrapper>
      <Button onClick={handleSubmit} color={Colors.White} backgroundColor={Colors.Buff}
              {...{extraSmall, small, medium, large, extraLarge}}>
         ENTER
      </Button>
    </ButtonWrapper>

  )
};

const RoomCodeForm = (props) => {

    return (
      <Card borderLarge color={Colors.Blue} borderColor={Colors.Blue}>
        <ComponentWrapper>
          <Title {...props}/>
          <CodeInput {...props}/>
          <EnterButton {...props}/>
          </ComponentWrapper>
      </Card>


    );

};

RoomCodeForm.propTypes = propTypes;
RoomCodeForm.defaultProps = defaultProps;

export default RoomCodeForm;
