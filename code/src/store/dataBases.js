export const optionBase = (id) => {
  return {
    id: id,
    value: 'Option'
  }
}

export const pollBase = (id) => {
  return {
    id: id,
    title: 'Poll',
    status: 'pending',
    type: 'single',
    description: 'Poll description.',
    options: {
      '00': {id: '00', value: 'Yes'},
      '01': {id: '01', value: 'No'},
      '02': {id: '02', value: 'Abstain'},
    },
    userInputOption: false,
    optionsOrder: ['00', '01', '02'],
    showResults: true,
  }
}

export const roomBase = (id) => {
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
          '00': {id: '00', value: 'Yes'},
          '01': {id: '01', value: 'No'},
          '02': {id: '02', value: 'Abstain'},
        },
        userInputOption: false,
        optionsOrder: ['00', '01', '02'],
        showResults: true,
      },
      order: {
        'open': [],
        'closed': [],
        'pending': ['00']
      },
    },
  }
}