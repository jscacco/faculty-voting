import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Jumbo            from '../theme/Jumbo';

import Card             from './Card';
import Button           from '../buttons/Button';
import SubmitButton           from '../buttons/SubmitButton';
import InputOption       from '../options/InputOption';
import TextOption from '../options/TextOption';

const propTypes = {
  children: PropTypes.node,

  title: PropTypes.string,
  description: PropTypes.string,
  width: PropTypes.int,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};

const defaultProps = {
  children: [],
  title: 'Poll Title',
  description: 'Poll description is very informative...'
};

const ComponentWrapper = styled.div`
  ${({small}) => small && `padding-bottom: 20px;`}
  ${({medium}) => medium && `padding-bottom: 26px;`}
  ${({large}) => large && `padding-bottom: 32px;`}
  width: auto;
`;

const renderTitle = ( props ) => {

  const { title, small, medium, large } = props;

  return (
    <ComponentWrapper small={small} medium={medium} large={large}>
      <Jumbo threeExtraSmall={small} twoExtraSmall={medium}
             extraSmall={large} color={Colors.Blue}>
        {title}
      </Jumbo>
    </ComponentWrapper>
  )
};

const renderDescription = ( props ) => {

  const { description, ...rest} = props;

  return (
    <ComponentWrapper {...rest}>
      <Body {...rest} color={Colors.Black}>
        {description}
      </Body>
    </ComponentWrapper>
  );
};

const renderChildren = ( props ) => {

  const { children, ...rest }  = props;

  return children.map((item, index) => {

    const lastChild = (index === children.length - 1);

    if (lastChild) {
      return(
        <div>
          {item}
        </div>
      )
    };

    return (
      <ComponentWrapper {...rest}>
        {item}
      </ComponentWrapper>
    );
  })
};

const VotingCard = ( props ) => {

  const { children, width } = props;

  return (
    <Card width={width}>
      {renderTitle(props)}
      {renderDescription(props)}
      {renderChildren(props)}
    </Card>
  )
};

VotingCard.propTypes = propTypes;
VotingCard.defaultProps = defaultProps;

export default VotingCard;
