import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import Card             from './Card'
import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';

const InnerWrapper = styled.div`
  /* border: 1px solid black; */
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`;

const HeaderWrapper = styled.div`
  padding: 5px;
  /* border: 1px solid black; */
`;

const DescriptionWrapper = styled.div`
  padding: 10px;
  /* border: 1px solid black; */
`;

const OptionGroupWrapper = styled.div`
  padding: 20px;
  /* border: 2px solid white; */
  /* background: ${Colors.White}; */
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* width: 75%; */
  /* border: 1px solid black; */
`;

const StatusWrapper = styled.div`
  padding-top: 0px;
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
`;

const ButtonStatusStackWrapper =  styled.div`
  padding: 15px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%
`;

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;


const PollCardBase = ( props ) => {

  const { header, description, optionGroup, button, statusText } = props;

  const _renderHeader = (
    <HeaderWrapper>
      {header}
    </HeaderWrapper>
  );

  const _renderDescription = (
    <DescriptionWrapper>
      {description}
    </DescriptionWrapper>
  );

  const _renderOptionGroup = (
    <OptionGroupWrapper>
      {optionGroup}
    </OptionGroupWrapper>
  );

  const _renderButton = (
    <CenterWrapper>
      <ButtonStatusStackWrapper>
        <ButtonWrapper>
          {button}
        </ButtonWrapper>
        <StatusWrapper>
          {statusText}
        </StatusWrapper>
      </ButtonStatusStackWrapper>
    </CenterWrapper>
  )


  return (
    <Card color={Colors.LightBlue} height={'100%'} large>
      <InnerWrapper>
        {_renderHeader}
        {_renderDescription}
        {_renderOptionGroup}
        {_renderButton}
      </InnerWrapper>
    </Card>
  )
};

export default PollCardBase;
