import ActionTypes from '../actionTypes';

const initialState = {
  loginAttempt: null,
  loginType: null,
  loading: false,
  error: null,
};

export default function reducePoll(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.login.HOST_LOGIN_START:
      return { ...state, loginType: null, loading: true, error: null }
    case ActionTypes.login.HOST_LOGIN_SUCCESS:
      return { ...state, loginType: 'host', loading: false }
    case ActionTypes.login.HOST_LOGIN_ERROR:
      return { ...state, loading: false, error: action.error }

    case ActionTypes.login.USER_LOGIN_START:
      return { ...state, loginType: null, loading: true, error: null }
    case ActionTypes.login.USER_LOGIN_SUCCESS:
      return { ...state, loginType: 'user', loading: false }
    case ActionTypes.login.USER_LOGIN_ERROR:
      return { ...state, loading: false, error: action.error }

    case ActionTypes.login.LOGOUT_START:
      return { ...state, loading: true, error: null }
    case ActionTypes.login.LOGOUT_SUCCESS:
      return { ...state, loginType: null, loading: false }
    case ActionTypes.login.LOGOUT_ERROR:
      return { ...state, loginType: null, loading: false, error: action.error }

    default:
      return state;
  }
  return state;
}
