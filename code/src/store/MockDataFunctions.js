import mockData from './mockData'

function fetchPollData(room_id, poll_id) {
  return mockData.rooms[room_id].polls[poll_id];
}

function fetchHostRooms() {
  const { order, ...rooms } = mockData.rooms;

  // console.log(order)

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

  const room = {
    id: roomcode,
    status: 'pending',
    title: `Room ${roomcode}`
  }

  mockData.rooms[roomcode] = room;
  mockData.rooms.order.pending.push(roomcode);

  const { order, ...rooms } = mockData.rooms;
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


function generatePollId() {
  const id = Math.floor(Math.random() * 100);
  const poll_id = `00${id}`;

  return poll_id.slice(-2);
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

function generateOptionId() {
  const id = Math.floor(Math.random() * 100);
  const poll_id = `00${id}`;

  return poll_id.slice(-2);
}

export { fetchPollData,
         fetchHostRooms, deleteHostRoom, addHostRoom,
         fetchAgenda, updateRoom, generatePollId,
        generateOptionId }
