import mockData from './mockData'
import { optionBase, pollBase, roomBase } from './dataBases'




function fetchPollData(room_id, poll_id) {
  return mockData.rooms[room_id].polls[poll_id];
}

function checkRoomcode(room_id) {
  if (mockData.rooms[room_id]) {
    return {}
  }
  else {
    throw "Room undefined."
  }
}

function fetchHostRooms() {
  const { order, ...rooms } = mockData.rooms;

  return {
    rooms: rooms,
    order: order
  }
}

function deleteHostRoom(room_id) {
  let { order, ...rooms } = mockData.rooms;
  const room = mockData.rooms[room_id]

  const newOrder = order[room.status].filter((i) => i != room_id);
  order[room.status] = newOrder;

  delete rooms[room_id];

  mockData.rooms = { order, ...rooms}
  return {
    rooms: rooms,
    order: order
  }

}

function generateRoomCode() {
  const code = Math.floor(Math.random() * 10000);
  const roomcode = `0000${code}`;

  return roomcode.slice(-4);
}

function addHostRoom() {
  let roomcode = generateRoomCode();
  while (mockData[roomcode] != undefined ) {
    roomcode = generateRoomCode();
  }

  const room = roomBase(roomcode);


  mockData.rooms[roomcode] = room;
  console.log(mockData)
  mockData.rooms.order['pending'].push(roomcode);
  console.log(mockData)

  const { order, ...rooms } = mockData.rooms;
  console.log(mockData.rooms)
  return {
    rooms: rooms,
    order: order
  }
}


function fetchAgenda(room_id) {

  console.log('fetch')

  const room = mockData.rooms[room_id];
  const { order, ...rest } = room.polls;

  console.log(room);

  return {
    title: room.title,
    status: room.status,
    polls: {...rest},
    order: order
  }
}

function updateRoom (roomcode, roomState) {

  console.log(roomState)

  let room = {...mockData.rooms[roomcode]};
  let newPolls = {...room.polls,
                  ...roomState.polls,
                  order: roomState.order }
  room.title = roomState.title;
  room.status = roomState.status;
  room.polls = newPolls;

  mockData.rooms[roomcode] = room;

  console.log('updated');
  console.log(mockData)

  return {
    ...roomState
  }
}

function generatePollId() {
  const id = Math.floor(Math.random() * 100);
  const poll_id = `00${id}`;

  return poll_id.slice(-2);
}

function addPoll(roomcode) {

  let poll_id = generatePollId();
  while (mockData.rooms[roomcode].polls[poll_id] != undefined ) {
    poll_id = generatePollId();
  }

  return {
    newPoll: pollBase(poll_id)
  }
}

function updatePollStatus(roomcode, pollcode, newStatus) {

  if (mockData.rooms[roomcode].status === 'open') {

    let newPoll = {...mockData.rooms[roomcode].polls[pollcode]};
    const oldStatus = newPoll.status;
    newPoll.status = newStatus;

    const newOrder = {...mockData.rooms[roomcode].polls.order}
    newOrder[oldStatus] = newOrder[oldStatus].filter(i => i !== pollcode);
    newOrder[newStatus].push(pollcode);

    mockData.rooms[roomcode].polls[pollcode] = {...newPoll};
    mockData.rooms[roomcode].polls.order = {...newOrder};
  }

  const { order, ...rest } = mockData.rooms[roomcode].polls;

  return {
    polls: {...rest},
    order: order
  }
}

function generateOptionId() {
  const id = Math.floor(Math.random() * 100);
  const poll_id = `00${id}`;

  return poll_id.slice(-2);
}

function getPollResults(room_id, poll_id) {

  const poll = {...mockData.rooms[room_id].polls[poll_id]}
  return {
    title: poll.title,
    description: poll.description,
    optionsOrder: poll.optionsOrder,
    options: {...poll.options},
    results: {...poll.results}
  }
}

export { checkRoomcode, fetchPollData,
         fetchHostRooms, deleteHostRoom, addHostRoom,
         fetchAgenda, updateRoom, addPoll, updatePollStatus,
        generateOptionId, getPollResults }
