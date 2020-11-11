import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { connect }          from 'react-redux';
import ActionTypes           from '../store/actionTypes';
import history              from '../history';

import ViewportHandler      from './format-pages/ViewportHandler';
import { Colors }           from '../components/theme/Colors';
import MainPage             from './format-pages/MainPage';

import RoomcodeCard         from '../components/cards/RoomcodeCard';

const RoomcodeWrapper = styled.div`
  width: ${({width}) => width};
`;

const RoomcodeComponent = ( props ) => {

  let width;
  let size = {};
  switch (props.viewport) {
    case 'smallDesktop':
      width = `75%`;
      size.small = true;
      break;
    case 'tablet':
      width = `100%`;
      size.small = true;
      break;
    case 'mobile':
    case 'smallMobile':
      width = `100%`
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      width = `50%`
      size.medium = true;
      break;
    default:
      width = `50%`
      size.small = true;
  }

  return (
    <RoomcodeWrapper width={width}>
       <RoomcodeCard title="Faculty Voting"
                     viewport={props.viewport} {...size}
                     value={props.roomcode}
                     handleChange={props.handleChange}
                     handleSubmit={props.handleSubmit}/>
    </RoomcodeWrapper>
  )
}

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
    <ViewportHandler>
       <MainPage color={Colors.Blue}>
           <RoomcodeComponent viewport={props.viewport}
                              value={props.roomcode}
                              handleChange={(event) => props.updateCode(event.target.value)}
                              handleSubmit={() => props.validateCode(props.roomcode)}/>
       </MainPage>
    </ViewportHandler>
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
