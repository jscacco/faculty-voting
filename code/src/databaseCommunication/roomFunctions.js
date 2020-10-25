import firestore from './permissions.js';
import { roomBase } from '../store/dataBases';
import { addPoll } from './pollFunctions';

function generateRoomCode() {
    const code = Math.floor(Math.random() * 10000);
    const roomcode = `0000${code}`;
  
    return roomcode.slice(-4);
}

const fetchHostRooms = async (host_id) => {
    //console.log('in host');
    try {
        var rooms = {}; //{ openRooms: [], pendingRooms: [], closedRooms: [] };
        var collect = firestore.collection(host_id);
        var order = { open: [], pending: [], closed: [] };
        await collect.get().then(snap => {
                //console.log(snap)
            snap.forEach(function (doc) {
                var room = { title: '', status: '', id: '' };
                //console.log(doc)

                if(doc.id != 'order') {
                    room['id'] = doc.id;               
                    room['title'] = doc.data()['roomTitle'];
                    room['status'] = doc.data()['status'];
                    rooms[doc.id] = room;
                    /*if(doc.data()['status'] == 'pending') {
                        room['status'] = 'pending';
                        rooms['pendingRooms'] = [...rooms['pendingRooms'], room];
                    }
                    else if(doc.data()['status'] == 'open') {
                        room['status'] = 'open';
                        rooms['openRooms'] = [...rooms['openRooms'], room];
                    }
                    else {
                        room['status'] = 'closed';
                        rooms['closedRooms'] = [...rooms['closedRooms'], room];
                    }*/
                }
                else {
                    order = doc.data();
                }
                //console.log(room)
            });
        });
        //console.log(rooms)

        return {
            rooms: rooms,
            order: order
        }
    } catch (error) {
        console.log(error);
    }
}

const setRoomOrder = async (host_id, new_order) => {
    try {
        await firestore
                .collection(host_id)
                .doc('order')
                .set(new_order);

        return;
    } catch (error) {
        console.log(error);
    }
}

const deleteHostRoom = async (host_id, room_id) => {
    try {
        let { order, ...rooms } = await fetchHostRooms(host_id);
        rooms = rooms['rooms'];
        const room = rooms[room_id];
        //console.log(rooms)
        const roomRef = firestore
                            .collection(host_id)
                            .doc(room_id);
        
        const newOrder = order[room.status].filter((i) => i != room_id);
        order[room.status] = newOrder;
        //console.log('deleting')
        await roomRef.delete();
        await setRoomOrder(host_id, order);
        delete rooms[room_id];

        return {
            rooms: rooms,
            order: order
        };
    } catch (error) {
        console.log(error);
    }
}

const addHostRoom = async (host_id) => {
    try {
        let exists = true;
        let roomCode = generateRoomCode();
        while(exists) {
            await firestore
                .collection(host_id)
                .doc(roomCode)
                .get()
                .then(docData => {
                    if(docData.exists) {
                        roomCode = generateRoomCode();
                    }
                    else {
                        exists = false;
                    }
                });  
        }
        
        var poll = roomBase(roomCode);
        delete poll.polls;

        await firestore
                .collection(host_id)
                .doc(roomCode)
                .set(poll);

        let pollRef = firestore
                        .collection(host_id)
                        .doc(roomCode)
                        .collection('polls')
                        .doc('order');

        await addPoll(host_id, roomCode);

        let { order, ...rooms } = await fetchHostRooms(host_id);
        order['pending'].push(roomCode);
        setRoomOrder(host_id, roomCode, order);
        
        return {
            rooms: rooms['rooms'],
            order: order
        };
    } catch (error) {
        console.log(error);
    }
}

const updateRoom = async (host_id, room_id, room_state) => {
    try {
        let { order, ...rooms } = await fetchHostRooms(host_id);
        let room = rooms['rooms'][room_id];
        let newPolls = {...room.polls,
                        ...room_state.polls,
                        order: room_state.order };
        room.title = room_state.title;
        room.status = room_state.status;
        room.polls = newPolls;
        
        await firestore.collection(host_id).doc(room_id).update(room);
        
        return {
            ...room_state
        }
    } catch (error) {
        console.log(error);
    }
}

export { fetchHostRooms, deleteHostRoom, addHostRoom, updateRoom, setRoomOrder }