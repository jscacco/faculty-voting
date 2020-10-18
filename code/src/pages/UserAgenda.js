import React, { useEffect }                from 'react';
import styled               from 'styled-components';

import { connect }          from 'react-redux';
import ActionTypes          from '../store/actionTypes';

import { Colors }           from '../components/theme/Colors';

import UserAgendaCard       from '../components/cards/UserAgendaCard';

import { fetchAgenda }      from '../store/MockDataFunctions';
import DemoNavBar       from '../components/DebuggingComponents/DemoNavBar';

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

const UserAgendaPage = ( props ) => {

  const roomcode = '0002'

  useEffect(() =>  {
    props.onFetchAgenda(roomcode);
  }, [])

  console.log(props);

  // const agenda = fetchAgenda()
  return (
    <PageWrapper>
      <DemoNavBar />
      <ComponentWrapper>
        <UserAgendaCard medium roomcode={roomcode}
                               title={props.title}
                               status={props.status}
                               polls={props.polls}
                               order={props.order}/>
      </ComponentWrapper>
    </PageWrapper>
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
