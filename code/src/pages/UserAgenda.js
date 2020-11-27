import React, { useEffect } from 'react';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import LoadingCard          from '../components/cards/LoadingCard';

import { Colors }           from '../components/theme/Colors';
import ViewportHandler      from './format-pages/ViewportHandler';
import MainPage             from './format-pages/MainPage';

import UserAgendaCard       from '../components/cards/UserAgendaCard';


const AgendaComponent = ( props ) => {

  let size = {};
  switch (props.viewport) {
    case 'mobile':
    case 'smallMobile':
    case 'tablet':
      size.extraSmall = true;
      break;
    case 'hdDesktop':
    case 'uhdDesktop':
      size.medium = true;
      break;
    default:
      size.small = true;
  }

  if (props.loading) {
    return (
      <LoadingCard cardColor={Colors.Blue}
                   cardBorderColor={Colors.White}
                   textColor={Colors.White}
                   {...size}/>
    );
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

  const roomcode = props.match.params.roomcode;
  const { user, onFetchAgenda, history } = props;

  useEffect(() =>  {
    if ( user === null) {
      alert('Please login with Hamilton affiliated email to access.')
      history.replace('/Login', [])
    }
    else if ( user !== undefined ){ onFetchAgenda(roomcode);}
  }, [user, roomcode, onFetchAgenda, history])

  if ( props.error ) { console.log(props.error); history.replace('/Login') }

  const onViewClick = (poll_id) => {
    props.polls[poll_id].status === 'closed' ?
      history.push(`/PollResults/${roomcode}/${poll_id}`) :
      history.push(`/UserPoll/${roomcode}/${poll_id}`)
  };


  return (
    <ViewportHandler>
      <MainPage roomcode={roomcode}>
          <AgendaComponent loading={props.loading}
                           viewport={props.viewport}
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
    user: state.auth.user,
    title: state.useragenda.title,
    status: state.useragenda.status,
    polls: state.useragenda.polls,
    order: state.useragenda.order,
    loading: state.auth.user === undefined || state.hostagenda.loading,
    error: state.useragenda.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAgenda: (room_id) => dispatch({ type: ActionTypes.useragenda.FETCH_AGENDA_START,
                                            room_id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAgendaPage);
