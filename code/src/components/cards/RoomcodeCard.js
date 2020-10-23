import React            from 'react';
import styled, { css }  from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Input            from '../inputs/Input';
import Card             from './Card';
import Button           from '../buttons/Button';
import Jumbo             from '../theme/Jumbo';



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
  padding-bottom: 20px;
`;

const TitleWrapper = styled.div`
  padding-bottom: 15px;
`;

const Title = (props) => {

  const { title, extraSmall, small, medium, large, extraLarge } = props;

  return (
    <TitleWrapper {...{extraSmall, small, medium, large, extraLarge}}>
      <Jumbo twoExtraSmall={extraSmall}
             extraSmall={small}
             small={medium}
             medium={large}
             large={extraLarge}
             color={Colors.Blue}>
        {title}
      </Jumbo>
    </TitleWrapper>
  )
};

const CodeInput = (props) => {
  const { label, value, handleChange, handleSubmit,
          extraSmall, small, medium, large, extraLarge } = props;

  return (
    <TextInputWrapper {...{extraSmall, small, medium, large, extraLarge}}>
      <Input type={"inputfield"} value={value} onChange={handleChange} placeholder={"Enter Room Code"}
             {...{extraSmall, small, medium, large, extraLarge}}/>
    </TextInputWrapper>
  )
};

const EnterButton = (props) => {

  const { extraSmall, small, medium, large, extraLarge, handleSubmit } = props;

  return(
    <ButtonWrapper>
      <Button onClick={handleSubmit}
              {...{extraSmall, small, medium, large, extraLarge}}>
         ENTER
      </Button>
    </ButtonWrapper>

  )
};

const RoomCodeForm = (props) => {

    return (
      <Card>
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
