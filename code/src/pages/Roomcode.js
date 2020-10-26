import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { connect }          from 'react-redux';
import ActionTypes           from '../store/actionTypes';
import history              from '../history';

import { Colors }           from '../components/theme/Colors';
import MainPage             from './format-pages/MainPage';

import RoomcodeCard         from '../components/cards/RoomcodeCard';

const RoomcodeWrapper = styled.div`
  width: 50%;
`;

const RoomCodeScreen = ( props ) => {

  if (props.submitted) {
    if (props.error) {
      alert(`Invalid code, please enter a valid code.`);
    }
    else {
      props.resetCode();
      alert('You are entering room: ' + props.roomcode);

      history.push(`/UserAgenda/${props.roomcode}`);
    }
  }

  return (
     <MainPage color={Colors.LightBlue}>
        <RoomcodeWrapper>
           <RoomcodeCard title="HamPolls" medium
                         color={"transparent"} value={props.roomcode}
                         handleChange={(event) => props.updateCode(event.target.value)}
                         handleSubmit={() => props.validateCode(props.roomcode)}/>
        </RoomcodeWrapper>
     </MainPage>
   );
}


const mapStateToProps = (state) => {

  return {
    roomcode: state.roomcode.roomcode,
    submitted: state.roomcode.submitted,
    loading: state.roomcode.loading,
    error: state.roomcode.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCode: (value) => dispatch({ type: ActionTypes.roomcode.UPDATE_ROOMCODE,
                                      value }),
    validateCode: (room_id) => dispatch({ type: ActionTypes.roomcode.CHECK_ROOMCODE_START,
                                          room_id }),
    resetCode: () => dispatch({ type: ActionTypes.roomcode.RESET_ROOMCODE,}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCodeScreen);
