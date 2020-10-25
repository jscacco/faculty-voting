import firestore from './permissions.js';

//const firestore = firebase.firestore();

function generateRoomCode() {
    const code = Math.floor(Math.random() * 10000);
    const roomcode = `0000${code}`;
  
    return roomcode.slice(-4);
}

function generatePollId() {
    const id = Math.floor(Math.random() * 100);
    const poll_id = `00${id}`;

    return poll_id.slice(-2);
}

function generateOptionId() {
    const id = Math.floor(Math.random() * 100);
    const poll_id = `00${id}`;
  
    return poll_id.slice(-2);
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

        return rooms;
    } catch (error) {
        console.log(error);
    }
}

const setRoomOrder = async (host_id, room_id, newOrder) => {
    try {
        await firestore
                .collection(host_id)
                .doc('order')
                .set(newOrder);
    } catch (error) {
        console.log(error);
    }
}

const deleteHostRoom = async (host_id, room_id) => {
    try {
        let { order, ...rooms } = await fetchHostRooms(host_id);
        rooms = rooms['rooms'];
        const room = rooms[room_id];
        //console.log(room)
        const roomRef = firestore
                            .collection(host_id)
                            .doc(room_id);
        
        const newOrder = order[room.status].filter((i) => i != room_id);
        order[room.status] = newOrder;
        //console.log('deleting')
        await roomRef.delete();
        await setRoomOrder(host_id, room_id, order);
        delete rooms[room_id];

        return {
            rooms: rooms,
            order: order
        };
    } catch (error) {
        console.log(error);
    }
}

const addHostRoom = async (host_id, room_title) => {
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
        
        await firestore
                .collection(host_id)
                .doc(roomCode)
                .set({
                    roomTitle: room_title,
                    status: 'pending',
                    id: roomCode
                 });
        let pollRef = firestore
                        .collection(host_id)
                        .doc(roomCode)
                        .collection('polls')
                        .doc('order');

        await pollRef.get().then(docData => {
            pollRef.set({
            closed: [],
            open: [],
            pending: [],
            next_id: 0
            });
        });

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

export { fetchHostRooms, deleteHostRoom, addHostRoom }