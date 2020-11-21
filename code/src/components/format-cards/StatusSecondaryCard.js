import React            from 'react';

import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import SecondaryCard    from './SecondaryCard'
import { Colors }       from '../theme/Colors';
import StatusText       from '../format-text/StatusText'

const propTypes = {
  header: PropTypes.string,
  headerButton: PropTypes.node,
  sections: PropTypes.arrayOf(PropTypes.object),
  footer: PropTypes.node,

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


const StatusSecondaryCard = ( props ) => {

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
    <SecondaryCard sections={sections.map((section) => renderSection(section))}
                   {...rest}/>
  )
};

StatusSecondaryCard.propTypes = propTypes;
StatusSecondaryCard.defaultProps = defaultProps;

export default StatusSecondaryCard;
