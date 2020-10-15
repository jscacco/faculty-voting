import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';

import PrimaryCard      from './PrimaryCard';

const propTypes = {
  header: PropTypes.string,
  headerButton: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,

  cardColor: ExtraPropTypes.color,
  cardBorderColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps ={
  header: 'Card',
  sections: [],
};


const SecondaryCard = ( props ) => {

  const { header, ...rest } = props;

 const renderHeader = (
   <Jumbo twoExtraSmall={props.extraSmall} extraSmall={props.small}
              small={props.medium} medium={props.large} large={props.extraLarge}
              color={Colors.White}>
         {header}
   </Jumbo>
 );

  return (
    <PrimaryCard header={renderHeader} {...rest}/>
  )
};

SecondaryCard.propTypes = propTypes;
SecondaryCard.defaultProps = defaultProps;

export default SecondaryCard;
