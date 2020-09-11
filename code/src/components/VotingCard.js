import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from './theme/Colors';
import Body             from './theme/Body';
import {Jumbo}             from './theme/Jumbo';

import OptionGroup      from './OptionGroup';
import Card             from './Card';
import Button           from './Button';

const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 16px`}
  ${({medium}) => medium && `padding-bottom: 20px`}
  ${({large}) => large && `padding-bottom: 26px`}
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const renderTitle = (props) => {

  const { title, small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Jumbo fourExtraSmall={small} threeExtraSmall={medium}
             twoExtraSmall={large} color={Colors.Blue}>
        {title}
      </Jumbo>
    </ComponentWrapper>
  )
};

const renderDescription = (props) => {

  const { description, small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Body small={small} medium={medium}
            large={large} color={Colors.Black}>
        {description}
      </Body>
    </ComponentWrapper>
  )
};

const renderButton = (props) => {

  const { small, medium, large } = props;

  let width;

  if (large) { width = 175}
  else if ( small ) { width = 125 }
  else { width = 150 }

  return(
    <ButtonWrapper>
      <Button small={small} medium={medium} large={large} width={width}>
        SUBMIT
      </Button>
    </ButtonWrapper>

  )
};

const renderOptions = (props) => {

  const { options, small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <OptionGroup small={small} medium={medium} large={large}
                   options={options} borderColor={Colors.Blue}
                   textColor={Colors.black}/>
    </ComponentWrapper>
  )
}

const VotingCard = (props) => {

  const { width } = props;

  return (
    <Card width={width}>
      {renderTitle(props)}
      {renderDescription(props)}
      {renderOptions(props)}
      {renderButton(props)}
    </Card>
  )

};

export default VotingCard;
