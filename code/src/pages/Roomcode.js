import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { connect } from 'react-redux';
import ActionTypes from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import RoomcodeCard         from '../components/cards/RoomcodeCard';
import history              from '../history';
// import firebase             from '../firebase';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


// async awaitValidation(validateCode, roomcode) {
//   await validateCode(roomcode);
// }

const RoomCodeScreen = ( props ) => {
  //
  // const handleSubmit = (event) => {
  //   props.validateCode(props.roomcode);
  //
  //   console.log(props.error);
  //
  //   if (props.error) {
  //     alert(`${props.roomcode} is an invalid code.`);
  //   }
  //   else {
  //     alert('You are entering room: ' + props.roomcode);
  //
  //     history.push(`/HostAgenda/${props.roomcode}`);
  //     event.preventDefault();
  // }
  // }

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
     <PageWrapper>
       <RoomcodeCard title="HamPolls" medium width={0}
                     color={"transparent"} value={props.roomcode}
                     handleChange={(event) => props.updateCode(event.target.value)}
                     handleSubmit={() => props.validateCode(props.roomcode)}/>
       <ParticlesBg type="cobweb" color={Colors.LightBlue} bg={true} />
     </PageWrapper>
   );
}

// export default RoomCodeScreen

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
