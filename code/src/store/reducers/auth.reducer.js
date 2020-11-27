import ActionTypes from '../actionTypes';

const initialState = {
  user: undefined,
  userType: undefined,
  loading: false,
  error: null,
};

export default function reduceAuth(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.auth.UPDATE_USER:
      console.log(action.user)
      let user = action.user === null ? null : {...action.user}
      return { ...state, user: user }

    default:
      return state;
  }
}
