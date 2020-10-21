import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import TertiaryCard    from './TertiaryCard'
import { Colors }       from '../theme/Colors';
import StatusText       from '../format-text/StatusText'

const propTypes = {
  header: PropTypes.string,
  headerButton: PropTypes.node,
  headerComponent: PropTypes.node,
  sections: PropTypes.arrayOf(PropTypes.object),
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


const StatusTertiaryCard = ( props ) => {

  const { sections, ...rest } = props;


  const renderSection = ( section ) => {

    const header = (
      <StatusText fiveExtraSmall={props.extraSmall} fourExtraSmall={props.small}
                  threeExtraSmall={props.medium} twoExtraSmall={props.large} extraSmall={props.extraLarge}
                  status={section.status} jumbo color={Colors.White} />
    );

    return {
      ...section,
      header: header
    }
  }

  return (
    <TertiaryCard sections={sections.map((section) => renderSection(section))}
                   {...rest}/>
  )
};

StatusTertiaryCard.propTypes = propTypes;
StatusTertiaryCard.defaultProps = defaultProps;

export default StatusTertiaryCard;
