import React            from 'react';
import styled, { css }  from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import Card             from './Card';
import Button           from './Button';
import Jumbo             from './theme/Jumbo';



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

  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  transform: translate(0, 65%);

`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;

  transform: translate(0%, -30%);

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

const renderButton = (props) => {

  const { small, medium, large, handleSubmit } = props;

  let width;

  if (large) { width = 175}
  else if ( small ) { width = 125 }
  else { width = 150 }

  return(
    <ButtonWrapper>
      <Button small={small} medium={medium} large={large} width={width} onClick={handleSubmit}>
         SIGN IN
      </Button>
    </ButtonWrapper>

  )
};

const SignInForm = (props) => {

    const { title, width, signedIn, handleSubmit } = props;

    return (
      <ComponentWrapper>
        <Card width={width}>
          {renderTitle(props)}
          {renderButton(props)}
        </Card>
      </ComponentWrapper>


    );

};

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;

export default SignInForm;
