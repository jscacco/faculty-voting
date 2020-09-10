import React from "react";
import styled from "styled-components";
import {Fonts} from './Typography/fonts.js'

const BodyText = styled.span`
  font-family: ${Fonts.OpenSans}
`;

const Popup = () => {
  return (
    <div>
      <BodyText>
        Test
      </BodyText>
    </div>
  )
};

export default Popup
