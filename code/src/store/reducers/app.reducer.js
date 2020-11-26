import ActionTypes from '../actionTypes';

const initialState = {
  user: null,
  loading: true,
  error: null,
};

export default function reduceApp(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.app.UPDATE_USER:
      console.log('updated')
      return { ...state, user: action.user, loading: false, }

    default:
      return state;
  }
}
