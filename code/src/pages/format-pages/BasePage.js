import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import PageHeader       from '../../components/theme/PageHeader'
import PageFooter       from '../../components/theme/PageFooter'

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
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  padding-top: 5vh;
  flex-grow: 2;
`;

const BasePageWrapper = (props) => {
  return (
    <PageWrapper color={props.color}>
      <PageHeader />
      <CenterWrapper>
        {props.children}
      </CenterWrapper>
      <PageFooter />
    </PageWrapper>
  )
}

BasePageWrapper.propTypes = propTypes;
BasePageWrapper.defaultProps = defaultProps;

export default BasePageWrapper;
