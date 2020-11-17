import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes		from 'react-extra-prop-types';


const propTypes = {
  primitive: PropTypes.string,
  children: PropTypes.node.isRequired,

  color: ExtraPropTypes.color,
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
};

const defaultProps = {
  primitive: 'span',
};

const TextWrapper = styled.span`
  color: ${({color}) => color}px;
  font-size: ${({fontSize}) => fontSize}px;
  line-height: ${({lineHeight}) => lineHeight}px;
  margin: 0;
`;

const Text = ( props ) => {

  const { primitive, children, ...rest } = props;

  return (
    <TextWrapper as={primitive} {...rest}>
      {children}
    </TextWrapper>
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
