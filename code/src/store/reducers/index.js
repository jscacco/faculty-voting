import { combineReducers } 	from 'redux';
import roomcode             from './roomcode.reducer'
import hostdash  								from './hostdash.reducer';
import useragenda  						from './useragenda.reducer';
import hostagenda 					from './hostagenda.reducer';
import userpoll             from './userpoll.reducer';
import hostpoll             from './hostpoll.reducer'

export default combineReducers({
  roomcode,
  hostdash,
  useragenda,
  hostagenda,
  userpoll,
  hostpoll,
});

// export default combineReducers({
// 	poll,
// 	roomcode,
// 	meetingroom,
// });
