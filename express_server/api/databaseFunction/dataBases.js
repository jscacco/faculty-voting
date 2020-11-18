const optionBase = (id) => {
  return {
    id: id,
    value: 'Option'
  }
}

const pollBase = (id) => {
  return {
    id: id,
    title: 'Poll',
    status: 'pending',
    type: 'single',
    description: 'Poll description.',
    options: {
	    '00': {count: 0, id: '00', value: 'Yes'},
      '01': {count: 0, id: '01', value: 'No'},
      '02': {count: 0, id: '02', value: 'Abstain'},
    },
    userInputOption: false,
    optionsOrder: ['00', '01', '02'],
    showResults: true,
    pollHash: "",
    results: {
      '00': {id: '00', count: 0},
      '01': {id: '01', count: 0},
      '02': {id: '02', count: 0},
    }
  }
}

const roomBase = (id) => {
  return {
    id: id,
    status: 'pending',
    title: 'Room',
    polls: {
      '00': {
        id: '00',
        title: 'Poll',
        status: 'pending',
        type: 'single',
        description: 'Poll description.',
        options: {
          '00': {count: 0, id: '00', value: 'Yes'},
          '01': {count: 0, id: '01', value: 'No'},
          '02': {count: 0, id: '02', value: 'Abstain'},
        },
        userInputOption: false,
        optionsOrder: ['00', '01', '02'],
        showResults: true,
        results: {
          '00': {id: '00', count: 0},
          '01': {id: '01', count: 0},
          '02': {id: '02', count: 0},
        }
      },
      order: {
        'open': [],
        'closed': [],
        'pending': ['00']
      },
    },
    roomHash: "",
    hosts: []
  }
}

module.exports = { optionBase, roomBase, pollBase };
