function fetchPollData(pollTitle) {
  return {
    title: pollTitle,
    type: 'single',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum egestas nulla non accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur nunc nisl, condimentum scelerisque dignissim sed, mattis in est. Nullam eu sem ultrices, consequat velit eget, fringilla justo. Mauris quis sodales purus, eu sollicitudin risus. Etiam malesuada risus a nibh facilisis volutpat. Praesent a bibendum mi, gravida pulvinar mauris. In hac habitasse platea dictumst. retium ligula at tincidunt. Suspendisse accumsan magna consequat dolor porttitor vestibulum vitae sed enim. Pellentesque ut viverra odio, non suscipit felis. Mauris elit nisl, luctus nec fermentum quis, interdum nec ligula.",
    options: [
      {value: "Option 1", count: 0, optionType: 'text', order: 0},
      {value: "Option 2", count: 0, optionType: 'text', order: 1},
      {value: "Option 3", count: 0, optionType: 'input', order: 2}
    ]
  }
}

function fetchHostRooms() {
  const openRoom = { roomTitle: 'Room', status:'open' , roomCode:'123'}
  const pendingRoom = { roomTitle: 'Room', status:'pending' , roomCode:'1234'}
  const closedRoom = { roomTitle: 'Room', status:'closed' , roomCode:'123'}

  const openRooms=[openRoom,openRoom,openRoom]
  const closedRooms = [closedRoom]
  const pendingRooms = [pendingRoom,pendingRoom,pendingRoom,pendingRoom,pendingRoom]

  return {
    openRooms: openRooms,
    closedRooms: closedRooms,
    pendingRooms: pendingRooms
  }
}

function fetchAgenda() {
  const openPoll = (i) => { return {title: 'Poll '.concat(i), status:'open' ,}}
  const pendingPoll = (i) => {return {title: 'Poll '.concat(i), status:'pending' , }}
  const closedPoll = (i) => { return {title: 'Poll '.concat(i), status:'closed' ,}}

  const openPolls=[openPoll(2),openPoll(3),openPoll(4)]
  const closedPolls = [closedPoll(1)]
  const pendingPolls = [pendingPoll(5),pendingPoll(6),pendingPoll(7),pendingPoll(8),pendingPoll(9)]
  const pendingOrder = [0, 1, 2, 3, 4]

  return {
    openPolls: openPolls,
    pendingPolls: pendingPolls,
    closedPolls: closedPolls,
    pendingOrder: pendingOrder
  }
}

export { fetchPollData, fetchHostRooms, fetchAgenda }
