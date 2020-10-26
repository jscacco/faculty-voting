import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

const propTypes = {
  children: PropTypes.node,
  color: ExtraPropTypes.color,
};

const defaultProps = {};

const PageWrapper = styled.div`
  background-color: ${({color}) => color};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  position: fixed;

  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const BasePageWrapper = ( props ) => {


  return (
    <PageWrapper color={props.color}>
      {props.children}
    </PageWrapper>
  )
}

BasePageWrapper.propTypes = propTypes;
BasePageWrapper.defaultProps = defaultProps;

export default BasePageWrapper;
