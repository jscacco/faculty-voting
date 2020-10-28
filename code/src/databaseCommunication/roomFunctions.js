import firestore from './permissions.js';
import { roomBase } from '../store/dataBases';
import { addPoll, fetchAgenda } from './pollFunctions';
import { generateRoomHash, generatePollHash, compareHashes } from './hashFunctions';

function generateRoomCode() {
    const code = Math.floor(Math.random() * 10000);
    const roomcode = `0000${code}`;
  
    return roomcode.slice(-4);
}

const checkRoomcode = async (host_id, room_id) => {

    const docRef = firestore.collection(host_id).doc(room_id)
    const doc = await docRef.get();
    //console.log(doc.exists)
    if(doc.exists) {
        return {};
    }
    else {
        throw "Room undefined."
    }

}

const checkRoomStatuses = async (rooms, order) => {
    // Ensure that all rooms' status matches the array they're in in order
    // (if they don't all match, the information was changed without updating the hash
    for (let room of rooms) {
	let roomStatus = room['status'];
	if (!(room['id'] in order[roomStatus])) {
	    console.log("!!Warning!! Room status in " + room['title'] + " has been changed. This means that the data has been tampered with via the Firebase Console!");
	    alert("Bad status warning - see console for more info.");
	    return false;
	}
    }

    // all good
    return true;
}

const fetchHostRooms = async (host_id) => {
    //console.log('here')
    try {
        let rooms = {}; //{ openRooms: [], pendingRooms: [], closedRooms: [] };
        let collect = firestore.collection(host_id);
        let order = { open: [], pending: [], closed: [] };
        await collect.get().then(snap => {
            snap.forEach(async function (doc) {
                let room = { title: '', status: '', id: '' };
                //console.log(doc)

                if(doc.id !== 'order') {
                    room['id'] = doc.id;               
                    room['title'] = doc.data()['title'];
                    room['status'] = doc.data()['status'];
                    rooms[doc.id] = room;
                    
                    // add in polls['order'] so we can factor that into the hash
                    let roomWithPollOrder = room;
                    
                    let orderRef = firestore.collection(host_id).doc(doc.id).collection('polls').doc('order');
                    let orderSnap = await orderRef.get();

                    roomWithPollOrder['pollOrder'] = orderSnap.data();
                    //console.log(roomWithPollOrder)
                    //console.log(doc.data()['roomHash'])
                    //console.log(room)
                    // make sure the hash of that room is good
                    // room = {'id': '', 'title': '', 'status': '', 'pollOrder': ''}
                    let hashComparison = await compareHashes(roomWithPollOrder, doc.data()['roomHash'], "room");
                    if (!hashComparison) {
                        // hash is bad:
                        console.log("!!Warning!! Data fetched from room " + room['id'] + " has a bad hash. This means that the data has been tampered with via the Firebase Console!");
                        alert("Bad hash warning - see console for more info.");
		            }
                }
                else {
                    order = doc.data();
                }
                //console.log(room)
            });
        });
        //console.log(rooms)

        // make sure the order of the rooms hasn't been changed; eliminates the need for hostHash
        //checkRoomStatuses(rooms, order);
		    
        return {
            rooms: rooms,
            order: order
        }
    } catch (error) {
        throw error;
    }
}

const setRoomOrder = async (host_id, new_order) => {
    try {
        console.log(new_order)
        await firestore
                .collection(host_id)
                .doc('order')
                .set(new_order);

        return;
    } catch (error) {
        throw error;
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
        
        const newOrder = order[room.status].filter((i) => i !== room_id);
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
        throw error;
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
        
        let room = roomBase(roomCode);
        delete room.polls;

        await firestore
                .collection(host_id)
                .doc(roomCode)
                .collection('polls')
                .doc('order')
                .set({
                    pending: [],
                    open: [],
                    closed: []
                });

        await addPoll(host_id, roomCode);

        await firestore
                .collection(host_id)
                .doc(roomCode)
                .set(room);

        

        let orderRef = firestore.collection(host_id).doc(roomCode).collection('polls').doc('order');
        let orderSnap = await orderRef.get();
        let pollOrder = orderSnap.data();

	// Compute the room hash and update it in firebase
        let roomHashData = { 'id': roomCode, 'title': room.title, 'status': room.status, 'pollOrder': pollOrder };
        let roomHash = await generateRoomHash(roomHashData);
	
        await firestore
                .collection(host_id)
                .doc(roomCode)
                .update({
                    roomHash: roomHash
                });

	// update the order of the rooms
	let { order, ...rooms } = await fetchHostRooms(host_id);
        order['pending'].push(roomCode);
	
        await setRoomOrder(host_id, order);
        
        return {
            rooms: rooms['rooms'],
            order: order
        };
    } catch (error) {
        throw error;
    }
}

const updateRoom = async (host_id, room_id, room_state) => {
    try {
        let { order, ...rooms } = await fetchHostRooms(host_id);
        let room = rooms['rooms'][room_id];
        
        let oldPolls = await fetchAgenda(host_id, room_id);

        let newPolls = {...oldPolls.polls,
                        ...room_state.polls,
                        order: room_state.order };

        room.title = room_state.title;
        room.status = room_state.status;
        //room.polls = newPolls;

        // TODO: make sure this still works
        // Compute the room's hash and update it
        // If something doens't work, check what room is (room.title)
        let roomHashInfo = {
            'id': room_id,
            'status': room.status,
            'title': room.title,
            'pollOrder': newPolls.order
        }
        room['roomHash'] = await generateRoomHash(roomHashInfo);
        console.log(host_id)
        console.log(room_id)
        await firestore
            .collection(host_id)
            .doc(room_id)
            .update({
                id: room_id,
                roomHash: room.roomHash,
                status: room.status,
                title: room.title
            });

        await setPollOrder(host_id, room_id, newPolls.order);
        console.log(newPolls.order)

        return {
            ...room_state
        }
    } catch (error) {
        throw error;
    }
}

const setPollOrder = async (host_id, room_id, new_order) => {
    // TODO: move this to roomFunctions.js
    // changes the order of the polls in the room

    try {
        // Get the room info so we can compute new hash
        const roomDocument = firestore
                                .collection(host_id)
                                .doc(room_id);
        let roomDocSnap = await roomDocument.get();
        let roomDocData = roomDocSnap.data();

        // Construct the new room map
        let newRoom = {
            'id': roomDocData['id'],
            'title': roomDocData['title'],
            'status': roomDocData['status'],
            'pollOrder': new_order
        };

        // Generate the new hash
        let newHash = await generateRoomHash(newRoom);
        
        // update room orders in firebase
        await firestore
            .collection(host_id)
            .doc(room_id)
            .collection('polls')
            .doc('order')
            .set(new_order);

        // update roomHash in firebase
        // if this breaks, roomHash might not exist currently (go into firebase and add it manually
        await firestore
                    .collection(host_id)
                    .doc(room_id)
                    .update({roomHash: newHash});

        return;
    } catch (error) {
        throw error;
    }
}

export { fetchHostRooms, deleteHostRoom, addHostRoom, updateRoom, setRoomOrder, checkRoomcode, setPollOrder }
