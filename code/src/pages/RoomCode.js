import React                from 'react';
import styled               from 'styled-components';
import ParticlesBg          from 'particles-bg';

import { connect } from 'react-redux';
import ActionTypes from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';
import RoomCodeForm         from '../components/RoomCodeForm';
import history              from '../history';
import firebase             from '../firebase';

const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
`;




const RoomCodeScreen = ( props ) => {

  const handleSubmit = (event) => {
    // console.log(props.roomcode);
    alert('You are entering room: ' + props.roomcode);

    history.push('/MeetingRoom');
    event.preventDefault();
  }

  return (
     <div>
       <RoomCodeForm title="HamPolls" width={0}
                     color={"transparent"} value={props.roomcode}
                     handleChange={(event) => props.updateCode(event.target.value)}
                     handleSubmit={handleSubmit}/>
       <ParticlesBg type="cobweb" color={Colors.LightBlue} bg={true} />
     </div>
   );
}

const mapStateToProps = (state) => {

  return {
    roomcode: state.roomcode.roomcode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCode: (value) => dispatch({ type: ActionTypes.roomcode.UPDATE_ROOMCODE,
                                      value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCodeScreen);
