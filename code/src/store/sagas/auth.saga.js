import { call, put, putResolve, take, cancelled }     from "redux-saga/effects";
import { eventChannel }           from "redux-saga";
import ActionTypes       from '../actionTypes';

import firebase from '../../databaseCommunication/permissions'

export function *syncUser () {

  const channel = new eventChannel(emit => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => emit({ user }));
    return unsubscribe;
  })
  try {
    while (true) {
      const { user } = yield take(channel);

      if (user) {

        yield putResolve( { type: 'UPDATE_USER', user: user});
      } else {
        console.log(user)
        yield putResolve({ type: 'UPDATE_USER', user:null});
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function *setUserId () {

}
