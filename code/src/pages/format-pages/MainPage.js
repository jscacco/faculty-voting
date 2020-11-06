import React            from 'react';
import styled           from 'styled-components';

import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../../components/theme/Colors';
import BasePage         from './BasePage';


const propTypes = {
  children: PropTypes.node,
  color: ExtraPropTypes.color,
};

const defaultProps = {
  color: Colors.LightBlue
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 80%;
`;


const MainPage = ( props ) => {

  console.log(props);

  return (
    <BasePage color={props.color}>
      <ComponentWrapper>
        {React.cloneElement(props.children, { viewport: props.viewport })}
      </ComponentWrapper>
    </BasePage>
  )
}

MainPage.propTypes = propTypes;
MainPage.defaultProps = defaultProps;

export default MainPage;
