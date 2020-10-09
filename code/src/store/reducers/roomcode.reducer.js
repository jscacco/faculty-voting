import ActionTypes from '../actionTypes';

const initialState = {
  roomcode: null,
};

let result;

export default function reducePoll(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.roomcode.UPDATE_ROOMCODE:
      result = action.value;
      // console.log(result);
      return {
        ...state,
        roomcode: result,
      };

  }
  // console.log(state);
  return state;
}

// export default function;
