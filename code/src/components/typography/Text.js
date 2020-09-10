import React      from 'react';
import styled     from 'styled-components';
import PropTypes  from 'prop-types';

const propTypes = {
  primitive: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  primitive: 'span'
};

const TextWrapper = styled.span`
  color: ${({color}) => color}px;
  font-size: ${({fontSize}) => fontSize}px;
  line-height: ${({lineHeight}) => lineHeight}px;
  margin: 0;
`;

const Text = ({ primitive, children, ...props }) => (
  <TextWrapper as={primitive} {...props}>
    {children}
  </TextWrapper>
);

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
