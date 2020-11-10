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
  headerComponent: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,

  headerColor: ExtraPropTypes.color,
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
  headerColor: Colors.White,
  sections: [],
};


const SecondaryCard = ( props ) => {

  const { header, headerComponent, headerColor, ...rest } = props;

 const renderHeader = (
   <Jumbo threeExtraSmall={props.extraSmall} extraSmall={props.small}
              small={props.medium} medium={props.large} large={props.extraLarge}
              color={headerColor}>
         {header}
   </Jumbo>
 );

  return (
    <PrimaryCard header={headerComponent ? headerComponent : renderHeader} {...rest}/>
  )
};

SecondaryCard.propTypes = propTypes;
SecondaryCard.defaultProps = defaultProps;

export default SecondaryCard;
