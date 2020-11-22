import React                from 'react';
import styled               from 'styled-components';

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

  let width = `100%`;
  let size = {};
  switch (props.viewport) {
    case 'smallDesktop':
      size.small = true;
      break;
    case 'tablet':
      size.extraSmall = true;
      break;
    case 'mobile':
    case 'smallMobile':
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      size.medium = true;
      break;
    default:
      size.small = true;
  }

  return (
    <RoomcodeWrapper width={width}>
       <RoomcodeCard title="Faculty Voting"
                     viewport={props.viewport} {...size}
                     value={props.roomcode}
                     handleChange={props.handleChange}
                     handleSubmit={props.handleSubmit}
                     onEnter={props.onEnter}/>
    </RoomcodeWrapper>
  )
}

const RoomCodeScreen = ( props ) => {

  if (props.submitted && !props.loading) {
    if (props.error) {
      props.resetCode();
      alert(`Invalid code, please enter a valid code.`);
    }
    else {
      props.resetCode();
      alert('You are entering room: ' + props.roomcode);

      history.push(`/UserAgenda/${props.roomcode}`);
    }
  }

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      props.validateCode(props.roomcode)
    }
  }

  return (
    <ViewportHandler>
       <MainPage color={Colors.Blue}>
           <RoomcodeComponent viewport={props.viewport}
                              value={props.roomcode}
                              handleChange={(event) => props.updateCode(event.target.value)}
                              handleSubmit={() => props.validateCode(props.roomcode)}
                              onEnter={onEnterPress}/>
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
