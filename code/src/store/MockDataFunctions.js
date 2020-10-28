import mockData from './mockData'
import { optionBase, pollBase, roomBase, } from './dataBases'




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

function updatePoll (roomcode, pollcode, pollState) {
  console.log(pollState)

  let room = {...mockData.rooms[roomcode]};
  let poll = {...room.polls[pollcode]};
  console.log(poll)
  room.polls[pollcode] = {
    ...room.polls[pollcode],
    ...pollState
  };

  mockData.rooms[roomcode] = room;

  console.log(mockData)

  console.log('updated');
  console.log(pollState)

  return {
    ...pollState
  }
}

function  updateRoomStatus(roomcode, newStatus) {

  const currentStatus = mockData.rooms[roomcode].status;
  console.log(currentStatus)
  let newRoomOrder = mockData.rooms.order;
  console.log(newRoomOrder)
  newRoomOrder[currentStatus] = newRoomOrder[currentStatus].filter((i) => i !== roomcode);
  console.log(newRoomOrder)
  console.log(newStatus)
  newRoomOrder[newStatus].push(roomcode);
  console.log(newRoomOrder)

  if (newStatus === 'closed') {

    let newPollsOrder = mockData.rooms[roomcode].polls.order;
    console.log(newPollsOrder)
    let allPolls = newPollsOrder['closed'].concat(newPollsOrder['open'], newPollsOrder['pending']);
    newPollsOrder = {
      'closed': allPolls,
      'open': [],
      'pending': [],
    }

    console.log(newPollsOrder)

    for (let i = 0; i < allPolls.length; i++) {
      let poll_id = allPolls[i];
      mockData.rooms[roomcode].polls[poll_id].status = 'closed';
    }

    mockData.rooms[roomcode].polls.order = newPollsOrder;
  }

  mockData.rooms.order = newRoomOrder;
  mockData.rooms[roomcode].status = newStatus;

  console.log(mockData)

  const { order, ...rest } = mockData.rooms[roomcode].polls;

  return {
    status: mockData.rooms[roomcode].status,
    polls: {...rest},
    order: order
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

function generateUserOptionId() {
  const id = Math.floor(Math.random() * 1000);
  const poll_id = `000${id}`;

  return poll_id.slice(-3);
}

function submitVote(room_id, poll_id, selection, submission, userInput) {
   const poll = mockData.rooms[room_id].polls[poll_id];

   for (let i; i < poll.optionsOrder.length; i++) {
     let option_id = poll.optionsOrder[i];
     let count = poll.results[option_id].count;

     if (submission[option_id]) { count = count - 1}
     if (selection[option_id]) { count = count + 1}

     poll.results[option_id].count = count;
   }

   let inputcode = null;
   if (selection[userInput.id]) {
     if (!userInput.submissionId) {
       inputcode = generateUserOptionId();
       while (poll.results[inputcode]) {
         inputcode = generateUserOptionId();
       }
     }
     else { inputcode = userInput.submissionId }

     const userInputResult = {
       id: inputcode,
       value: userInput.value,
       count: 1
     }

     poll.results[inputcode] = userInputResult;
   }
   else if (userInput.submissionId ){
     delete poll.results[userInput.submissionId]
   }
   console.log(mockData.rooms[room_id].polls[poll_id].results)
   mockData.rooms[room_id].polls[poll_id] = poll;

   return {
     submitted: true,
     inputSubmissionId: inputcode
   }
}

export { checkRoomcode, fetchPollData,
         fetchHostRooms, deleteHostRoom, addHostRoom,
         fetchAgenda, updateRoom, addPoll, updatePoll, updatePollStatus,
         updateRoomStatus,
        generateOptionId, getPollResults, submitVote }
