import firebase from './permissions.js';
import { roomBase } from '../store/dataBases';
import { addPoll, fetchAgenda, updatePollStatus, fetchPollData, getPollResults, getPollOrder } from './pollFunctions';
import { generateRoomHash, generatePollHash, compareHashes } from './hashFunctions';
import { userIsHost, userIsVoter } from '../LoginUtils.js';


const firestore = firebase.firestore();
const fireauth = firebase.auth();

function generateRoomCode() {
    const code = Math.floor(Math.random() * 10000);
    const roomcode = `0000${code}`;

    return roomcode.slice(-4);
}

// const checkRoomcode = async (host_id, room_id) => {
const checkRoomcode = async (room_id) => {

    const host_id = await getHost(room_id);

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
    // console.log(typeof rooms);
    for (let roomKey in rooms) {
        let room = rooms[roomKey];
        let roomStatus = room['status'];
        if (!(order[roomStatus].indexOf(room['id']) > -1)) {
            console.log("!!Warning!! Room status in " + room['title'] + " has been changed. This means that the data has been tampered with via the Firebase Console!");
            alert("Bad status warning - see console for more info.");
            return false;
        }
    }

    // all good
    return true;
}

const fetchHostRooms = async (host_id) => {
    // console.log("checking if user is voter...");
    // console.log(await userIsVoter());

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
		            room['hosts'] = doc.data()['hosts'];
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
        checkRoomStatuses(rooms, order);

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
        // console.log(new_order)
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

        const newOrder = order[room.status].filter((i) => i !== room_id);
        order[room.status] = newOrder;
        //console.log('deleting')

        // must individually delete subcollections
        let pollSnap = await roomRef.collection('polls').get();

        for (let i = 0; i < pollSnap.docs.length; i++) {
            let optionRef = roomRef.collection('polls').doc(pollSnap.docs[i].id).collection('Options');
            let userOptionRef = roomRef.collection('polls').doc(pollSnap.docs[i].id).collection('userOptions');
            let optionSnap = await optionRef.get();
            let userOptionSnap = await userOptionRef.get();

            // delete options collection
            for (let x = 0; x < optionSnap.docs.length; x++) {
                await optionRef.doc(optionSnap.docs[x].id).delete();
            }

            // delete userOptions collection
            for (let x = 0; x < userOptionSnap.docs.length; x++) {
                await userOptionRef.doc(userOptionSnap.docs[x].id).delete();
            }

            // delete poll
            await roomRef.collection('polls').doc(pollSnap.docs[i].id).delete();
        }

        // delete room
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
    if (!(userIsHost(host_id))) {
	console.log("You are not the host! Call to addHostRoom cancelled.");
    } else {
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

                // update the order of the rooms
                let { order, ...hostDash } = await fetchHostRooms(host_id);
                order['pending'].push(roomCode);

                let room = roomBase(roomCode);
                room.hosts.push(host_id);

                // can probably change room base to not have to do this
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

                await firestore
                    .collection(host_id)
                    .doc(roomCode)
                    .set(room);

                await addPoll(host_id, roomCode);

                let orderRef = firestore.collection(host_id).doc(roomCode).collection('polls').doc('order');
                let orderSnap = await orderRef.get();
                let pollOrder = orderSnap.data();

                // Compute the room hash and update it in firebase
                let roomHashData = { id: roomCode, title: room.title, status: room.status, pollOrder: pollOrder, hosts: room.hosts };
                let roomHash = await generateRoomHash(roomHashData);

                await firestore
                    .collection(host_id)
                    .doc(roomCode)
                    .update({
                        roomHash: roomHash
                    });

                await setRoomOrder(host_id, order);

                hostDash['rooms'][roomCode] = room;

                return {
                    rooms: hostDash['rooms'],
                    order: order
                };
        } catch (error) {
                console.log(error);
        }
    }
}

const updateRoom = async (host_id, room_id, room_state) => {
    if (!(userIsHost(host_id))) {
        console.log("You are not the host! Call to updateRoom cancelled.");
    } else {
        try {
            let { order, ...hostDash } = await fetchHostRooms(host_id);
            let room = hostDash['rooms'][room_id];
            // console.log(room)
            let oldPolls = await fetchAgenda(host_id, room_id);
            // console.log('AGENDA')
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
                id: room_id,
                status: room.status,
                title: room.title,
                pollOrder: newPolls.order,
                hosts: room.hosts
            }
            room['roomHash'] = await generateRoomHash(roomHashInfo);
            // console.log(host_id)
            // console.log(room_id)
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
            // console.log(newPolls.order)

            return {
                ...room_state
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const setPollOrder = async (host_id, room_id, new_order) => {
    // TODO: move this to roomFunctions.js
    // changes the order of the polls in the room

    if (!(userIsHost(host_id))) {
	console.log("You are not the host! Call to addHostRoom cancelled.");
    } else {
	try {
            // Get the room info so we can compute new hash
            const roomDocument = firestore
                  .collection(host_id)
                  .doc(room_id);
            let roomDocSnap = await roomDocument.get();
            let roomDocData = roomDocSnap.data();

            // Construct the new room map
            let newRoom = {
		id: roomDocData['id'],
		title: roomDocData['title'],
		status: roomDocData['status'],
		pollOrder: new_order,
		hosts: roomDocData['hosts']
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
            console.log(error);
	}
    }
}

const getHost = async (room_id) => {
    try {
        let docRef = firestore
                        .collection('openRooms')
                        .doc(room_id);
        let docSnap = await docRef.get();
        let docData = docSnap.data();

        return docData.host_id;
    } catch(error) {
        console.log(error)
    }
}

const updateRoomStatus = async (host_id, room_id, new_status) => {
    if (!(userIsHost(host_id))) {
	console.log("You are not the host! Call to updateRoom cancelled.");
    } else {
        try {
            const rooms = await fetchHostRooms(host_id)
            const room = rooms.rooms[room_id];
            const currentStatus = room.status;
            const order = rooms.order;
            order[currentStatus] = order[currentStatus].filter((i) => i !== room_id);
            order[new_status].push(room_id);

            await firestore
                .collection(host_id)
                .doc(room_id)
                .update({ status: new_status });

            await setRoomOrder(host_id, order);

            if (new_status === 'open') {
                await firestore
                        .collection('openRooms')
                        .doc(room_id)
                        .set({ host_id: host_id })
                    }
            else if(new_status === 'closed') {
                await firestore
                        .collection('openRooms')
                        .doc(room_id)
                        .delete();

                // set polls to be closed
                let newPollsOrder = room.pollOrder;
                let allPolls = newPollsOrder['closed'].concat(newPollsOrder['open'], newPollsOrder['pending']);

                for (let i = 0; i < allPolls.length; i++) {
                    let poll_id = allPolls[i];
                    await updatePollStatus(host_id, room_id, poll_id, 'closed');
                }
            }
            // console.log(room.hosts)
            // console.log(room['hosts'])
            let roomData = {
                id: room_id,
                title: room.title,
                status: new_status,
                hosts: room['hosts'],
                pollOrder: await getPollOrder(host_id, room_id)
            }

            await firestore
                .collection(host_id)
                .doc(room_id)
                .update({ roomHash: await generateRoomHash(roomData) });

            //let agenda = await fetchAgenda(host_id, room_id);
            //console.log(agenda.polls)

            const collect = firestore
                .collection(host_id)
                .doc(room_id)
                .collection('polls');

            const collectSnap = await collect.get();
            const collectData = collectSnap.docs;
            const polls = {};
            let new_order = {};

            for (let i = 0; i < collectData.length; i++) {
                const poll_id = collectData[i].id;

                if(poll_id != 'order') {
                    polls[poll_id] = await fetchPollData(host_id, room_id, poll_id);
                }
                else {
                    new_order = collectData[i].data();
                }
            }

            return {
                status: new_status,
                polls: {...polls},
                order: new_order
            }
        } catch(error) {
                console.log(error)
        }
    }
}

const getRoomResults = async (host_id, room_id) => {

    try {
        let hostDash = await fetchHostRooms(host_id);
        let room = hostDash.rooms[room_id];
        let pollOrder = await getPollOrder(host_id, room_id);
        let closedPolls = pollOrder.closed;

        const pollsResults = {};

        for (let i = 0; i < closedPolls.length; i++) {
            const poll_id = closedPolls[i];
            const poll_result = await getPollResults(host_id, room_id, poll_id, host_id);
            // console.log(poll_result);
            pollsResults[poll_id] = poll_result;
        }

        return {
            title: room.title,
            order: closedPolls,
            allResults: pollsResults,
        }
    } catch(error) {
        console.log(error);
    }
}

export { fetchHostRooms, deleteHostRoom, addHostRoom, updateRoom, setRoomOrder, checkRoomcode, setPollOrder, updateRoomStatus, getRoomResults, getHost }
