import { combineReducers } 	from 'redux';
import poll  								from './poll.reducer';
import roomcode  						from './roomcode.reducer';
import meetingroom 					from './meetingroom.reducer';

export default combineReducers({
	poll,
	roomcode,
	meetingroom,
});
