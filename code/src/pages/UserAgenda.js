import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';
import history              from '../history';

import { Colors }           from '../components/theme/Colors';
import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';

import UserAgendaCard       from '../components/cards/UserAgendaCard';


const PageWrapper = styled.div`
  background-color: ${Colors.LightBlue};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;

  position: fixed;
  overflow: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ComponentWrapper = styled.div`
  height: 80%;
  width: 80%;
`;

const AgendaComponent = ( props ) => {

  let size = {};
  switch (props.viewport) {
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
    <UserAgendaCard {...size}
                    roomcode={props.roomcode}
                    title={props.title}
                    status={props.status}
                    polls={props.polls}
                    order={props.order}
                    onViewClick={props.onViewClick}/>
  )
}

const UserAgendaPage = ( props ) => {

  const roomcode = props.match.params.roomcode || '0000'

  useEffect(() =>  {
    props.onFetchAgenda(roomcode);
  }, [])

  const onViewClick = (poll_id) => {
    props.polls[poll_id].status === 'closed' ?
      history.push(`/PollResults/${roomcode}/${poll_id}`) :
      history.push(`/UserPoll/${roomcode}/${poll_id}`)
  };


  return (
    <ViewportHandler>
      <MainPage>
          <AgendaComponent viewport={props.viewport}
                           roomcode={roomcode}
                           title={props.title}
                           status={props.status}
                           polls={props.polls}
                           order={props.order}
                           onViewClick={onViewClick}/>
      </MainPage>
    </ViewportHandler>
  );

}
const mapStateToProps = (state) => {

  return {
    title: state.useragenda.title,
    status: state.useragenda.status,
    polls: state.useragenda.polls,
    order: state.useragenda.order,
    loading: state.useragenda.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAgenda: (room_id) => dispatch({ type: ActionTypes.useragenda.FETCH_AGENDA_START,
                                            room_id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAgendaPage);
