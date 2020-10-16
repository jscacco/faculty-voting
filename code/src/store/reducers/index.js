import { combineReducers } 	from 'redux';
import hostdash  								from './hostdash.reducer';
import useragenda  						from './useragenda.reducer';
import hostagenda 					from './hostagenda.reducer';

export default combineReducers({
  hostdash,
  useragenda,
  hostagenda
});

// export default combineReducers({
// 	poll,
// 	roomcode,
// 	meetingroom,
// });
