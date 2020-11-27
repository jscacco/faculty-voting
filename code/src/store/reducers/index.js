import { combineReducers } 	  from 'redux';
import auth                    from './auth.reducer'
import login                  from './login.reducer';
import roomcode               from './roomcode.reducer'
import hostdash  						  from './hostdash.reducer';
import useragenda  					  from './useragenda.reducer';
import hostagenda 					  from './hostagenda.reducer';
import userpoll               from './userpoll.reducer';
import hostpoll               from './hostpoll.reducer';
import pollresults            from './pollresults.reducer';
import roomresults            from './roomresults.reducer';

export default combineReducers({
  auth,
  login,
  roomcode,
  hostdash,
  useragenda,
  hostagenda,
  userpoll,
  hostpoll,
  pollresults,
  roomresults,
});
