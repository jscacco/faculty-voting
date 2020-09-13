import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import Card             from './Card';
import Button           from './Button';
import {Jumbo}             from './theme/Jumbo';



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
  ${({small}) => small && `padding-bottom: 16px`}
  ${({medium}) => medium && `padding-bottom: 20px`}
  ${({large}) => large && `padding-bottom: 26px`}

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`;

const renderTitle = (props) => {

  const { title, small, medium, large } = props;

  return (
    <TitleWrapper>
      <Jumbo extraSmall color={Colors.Blue}>
        {title}
      </Jumbo>
    </TitleWrapper>
  )
};

const renderInput = (props) => {
  const { label, small, medium, large, value, handleChange, handleSubmit } = props;

  return (
    <TextInputWrapper>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </TextInputWrapper>
  )
};

const renderButton = (props) => {

  const { small, medium, large, handleSubmit } = props;

  let width;

  if (large) { width = 175}
  else if ( small ) { width = 125 }
  else { width = 150 }

  return(
    <ButtonWrapper>
      <Button small={small} medium={medium} large={large} width={width} onClick={() => handleSubmit}>
        SUBMIT
      </Button>
    </ButtonWrapper>

  )
};

const RoomCodeForm = (props) => {

    const { title, width, value, handleChange, handleSubmit } = props;

    return (
      <ComponentWrapper>
        <Card width={width}>
          {renderTitle(props)}
          {renderInput(props)}
          {renderButton(props)}
        </Card>
      </ComponentWrapper>


    );

};

RoomCodeForm.propTypes = propTypes;
RoomCodeForm.defaultProps = defaultProps;

export default RoomCodeForm;
