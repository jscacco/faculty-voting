import PollItem from "./components/PollItem";
import RoomItem        from './components/RoomItem';

var poll = new PollItem();
poll.setType('single');
poll.setTitle('Poll Title');


var testRoom = new RoomItem();
testRoom.setHost('cdubin');
testRoom.setRoomCode('123');
testRoom.setRoomTitle('This is a room title');
testRoom.addPoll(poll);
poll.setTitle('Poll2')
testRoom.addPoll(poll);
//testRoom.logData();
//testRoom.publishRoom();

export default testRoom;