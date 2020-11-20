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
  color: Colors.Blue
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: ${({roomcode}) => roomcode ? `2vh 5vw 5vh 5vw` : `5vh 5vw`};
`;


const MainPage = ( props ) => {

  console.log(props);

  return (
    <BasePage color={props.color} viewport={props.viewport} roomcode={props.roomcode}>
      <ComponentWrapper roomcode={props.roomcode}>
        {React.cloneElement(props.children, { viewport: props.viewport })}
      </ComponentWrapper>
    </BasePage>
  )
}

MainPage.propTypes = propTypes;
MainPage.defaultProps = defaultProps;

export default MainPage;
