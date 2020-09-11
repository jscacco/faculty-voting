import React    from 'react';
import styled   from 'styled-components';

import { Colors } from '../components/theme/Colors';
import Button from '../components/Button';
import Bubble from '../components/Bubble';
import Option from '../components/Option';
import OptionGroup from '../components/OptionGroup';
import Card from '../components/Card';
import VotingCard from '../components/VotingCard';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;


const MainScreen = (props) => {

  return(
    <PageWrapper>
      <VotingCard medium
                  width={600}
                  title={'Poll Title'}
                  description={'Description of the poll... very informative.'}
                  options={['Option 1', 'Option 2', 'Option 3']}/>
    </PageWrapper>
  )

};

export default MainScreen;
