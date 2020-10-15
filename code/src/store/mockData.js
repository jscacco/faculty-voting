
const data = {
  rooms: {
    '0000': {
      id: '0000',
      status: 'closed',
      title: 'Room 0000',
      polls: [],
    },
    '0001': {
      id: '0001',
      status: 'closed',
      title: 'Room 0001',
      polls: [],
    },
    '0002': {
      id: '0002',
      status: 'open',
      title: 'Room 0002',
    },
    '0003': {
      id: '0003',
      status: 'pending',
      title: 'Room 0003',
    },
    '0004': {
      id: '0004',
      status: 'pending',
      title: 'Room 0004',
    },
    order: {
      'open': ['0002'],
      'closed': ['0000', '0001'],
      'pending': ['0003','0004']
    }
}
export default data;
