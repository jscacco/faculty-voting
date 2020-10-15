import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';

import SecondaryCard    from './SecondaryCard';

const propTypes = {
  header: PropTypes.string,
  headerButton: PropTypes.node,
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

const SectionWrapper = styled.div`
`;


const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: ${({padding}) => padding}px;
`;

const TertiaryCard = ( props ) => {

  const { sections, ...rest } = props;

  let padding;
  if (props.extraSmall) { padding = 14}
  else if (props.small) { padding = 16}
  else if (props.large) { padding = 28}
  else if (props.extraLarge) { padding = 32}
  else { padding = 22}


  const _renderSection = ( section ) => {

    return (
    <SectionWrapper>
      <HeaderWrapper padding={padding}>
        {section.header}
      </HeaderWrapper>
      {React.cloneElement(section.content, {...rest})}
    </SectionWrapper>
  );}


  const renderedSections = sections.map((section) => _renderSection(section));

  return (
    <SecondaryCard {...rest}>
      {renderedSections}
    </SecondaryCard>
  )
};

TertiaryCard.propTypes = propTypes;
TertiaryCard.defaultProps = defaultProps;

export default TertiaryCard;
