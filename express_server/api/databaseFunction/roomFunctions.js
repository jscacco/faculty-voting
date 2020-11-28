const pollFuncs = require('./pollFunctions');
const hashFuncs = require('./hashFunctions');
const loginFuncs = require('./loginUtils');
const roomBase = require('./dataBases').roomBase;
const admin = require('./permissions');
const firebase = admin.firebase;
const firestore = admin.firestore;
const fireauth = admin.fireauth;

function generateRoomCode() {
    const code = Math.floor(Math.random() * 10000);
    const roomcode = `0000${code}`;

    return roomcode.slice(-4);
}

const checkRoomcode = async (room_id) => {
    try {
        const docRef = firestore.collection('liveRooms').doc(room_id);
        const doc = await docRef.get();

        if(doc.exists) {
            return true;
        }
        else {
            return false;
        }
    } catch(error) {
        console.log(error);
    }
}

const checkRoomStatuses = async (rooms, order) => {
    // Ensure that all rooms' status matches the array they're in in order
    // (if they don't all match, the information was changed without updating the hash
    for (let roomKey in rooms) {
        let room = rooms[roomKey];
        let roomStatus = room['status'];
        if (!(order[roomStatus].indexOf(room['id']) > -1)) {
            return `!!Warning!! Room status in ${room['title']} has been changed. This means that the data has been tampered with via the Firebase Console!`;
        }
    }

    // all good
    return true;
}

const fetchHostRooms = async (host_id, fetching=false) => {
    try {
        let rooms = {}; //{ openRooms: [], pendingRooms: [], closedRooms: [] };
        let collect = firestore.collection(host_id);
        let collectSnap = await collect.get();
        let order = { open: [], pending: [], closed: [] };

        if(fetching === 'false') {
            fetching = false;
        }
        else if(fetching === 'true') {
            fetching = true;
        }
        else if(fetching) {
            fetching = fetching;
        }
        else {
            fetching = false;
        }

        let docs = collectSnap.docs;
        for(let i = 0; i < docs.length; i++) {
            let doc = docs[i];
            let room = { title: '', status: '', id: '' };

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

                // make sure the hash of that room is good
                // room = {'id': '', 'title': '', 'status': '', 'pollOrder': ''}
                let hashComparison = await hashFuncs.compareHashes(roomWithPollOrder, doc.data()['roomHash'], "room");

                if (!hashComparison && !fetching) {
                    // console.log("CLKSOING")
                    await closeRoom(host_id, doc.id);
                    return `!!Warning!! Data fetched from room ${room['id']} has a bad hash. This means that the data has been tampered with via the Firebase Console!${doc.id}`;
                }
            }
            else {
                order = doc.data();
            }
        }

        // make sure the order of the rooms hasn't been changed; eliminates the need for hostHash
        const statuses = await checkRoomStatuses(rooms, order);
        if(typeof statuses === 'string') {
            return statuses;
        }
        
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
        rooms = rooms.rooms;
        const room = rooms[room_id];
        if(room !== undefined) {
            const roomRef = firestore
                                .collection(host_id)
                                .doc(room_id);

            const newOrder = order[room.status].filter((i) => i !== room_id);
            order[room.status] = newOrder;

            // must individually delete subcollections
            let pollSnap = await roomRef.collection('polls').get();

            for (let i = 0; i < pollSnap.docs.length; i++) {
                await pollFuncs.deletePoll(host_id, room_id, pollSnap.docs[i].id);
            }

	        await hashFuncs.deleteRoomPeppers(room_id);
	    
            // delete room
            await roomRef.collection('polls').doc('order').delete();
            await roomRef.delete();

            await setRoomOrder(host_id, order);
            delete rooms[room_id];

            await firestore.collection('liveRooms').doc(room_id).delete();
            await firestore.collection('voting').doc(room_id).delete();
        }

        return {
            rooms: rooms,
            order: order
        };
    } catch (error) {
        console.log(error);
    }
}

const addHostRoom = async (host_id, user) => {
    try {
        let exists = true;
        let roomCode = generateRoomCode();
        let roomSnap = await firestore
                        .collection(host_id)
                        .get();

        if(roomSnap.docs.length < 1) {
            await firestore
                    .collection(host_id)
                    .doc('order')
                    .set({
                        pending: [],
                        open: [],
                        closed: []
                    });
            roomSnap = await firestore
                                .collection(host_id)
                                .get();
        }
        let roomDocs = roomSnap.docs;

        while(exists) {
            for(let i = 0; i < roomDocs.length; i++) {
                if(roomDocs[i].id === roomCode) {
                    roomCode = generateRoomCode();
                    exists = true;
                    break;
                }
                else {
                    exists = false;
                }
            }           
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
            
        await firestore
                .collection('voting')
                .doc(roomCode)
                .set({
                    voting: []
                });

        await pollFuncs.addPoll(host_id, roomCode, user);
            
        let orderRef = firestore.collection(host_id).doc(roomCode).collection('polls').doc('order');
        let orderSnap = await orderRef.get();
        let pollOrder = orderSnap.data();

        // Compute the room hash and update it in firebase
        let roomHashData = { id: roomCode, title: room.title, status: room.status, pollOrder: pollOrder, hosts: room.hosts };
        let roomHash = await hashFuncs.generateRoomHash(roomHashData);

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

const updateRoom = async (host_id, room_id, room_state, user) => {
    let user_id = loginFuncs.getUserName(user);
    if (!(await loginFuncs.isHostOfRoom(user_id, room_id))) {
        return "You are not the host! Call to updateRoom cancelled.";
    } else { 
        try {
            let { order, ...hostDash } = await fetchHostRooms(host_id);
            let room = hostDash['rooms'][room_id]; 
            let oldPolls = await pollFuncs.fetchAgenda(host_id, room_id);
            let newPolls = {...oldPolls.polls,
                            ...room_state.polls,
                            order: room_state.order };

            room.title = room_state.title;
            room.status = room_state.status;

            let roomHashInfo = {
                id: room_id,
                status: room.status,
                title: room.title,
                pollOrder: newPolls.order,
                hosts: room.hosts
            }
            room['roomHash'] = await hashFuncs.generateRoomHash(roomHashInfo);

            await firestore
                .collection(host_id)
                .doc(room_id)
                .update({
                    id: room_id,
                    roomHash: room.roomHash,
                    status: room.status,
                    title: room.title
                });

            let old_order = await pollFuncs.getPollOrder(host_id, room_id);
            let a = newPolls.order['pending'].concat(newPolls.order['closed'], newPolls.order['open']);
            let b = old_order['pending'].concat(old_order['closed'], old_order['open']);
            let deleted = b.filter(x => !a.includes(x));
           
            for(let i = 0; i < deleted.length; i++) {
                await pollFuncs.deletePoll(host_id, room_id, deleted[i]);
            }

            await setPollOrder(host_id, room_id, newPolls.order, user);

            return {
                ...room_state
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const setPollOrder = async (host_id, room_id, new_order, user) => {
    let user_id = loginFuncs.getUserName(user);
    if (!(await loginFuncs.isHostOfRoom(user_id, room_id))) {
        return "You are not the host! Call to updateRoom cancelled.";
    } 
    else {
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
            let newHash = await hashFuncs.generateRoomHash(newRoom);
           
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
                        .collection('liveRooms')
                        .doc(room_id);
        let docSnap = await docRef.get();
        let docData = docSnap.data();

        return docData.host_id;
    } catch(error) {
        console.log(error)
    }
}

const closeRoom = async (host_id, room_id) => {
    try {
        const rooms = await fetchHostRooms(host_id, true);
        const room = rooms.rooms[room_id];
        const currentStatus = room.status;
        const order = rooms.order;
        order[currentStatus] = order[currentStatus].filter((i) => i !== room_id);
        order['closed'].push(room_id);
        
        let new_title = room.title += ' closed because of bad hash';

        await firestore
                .collection('liveRooms')
                .doc(room_id)
                .set({ host_id: host_id })

        await firestore
                .collection(host_id)
                .doc(room_id)
                .update({ status: 'closed',
                          title: new_title });

        await setRoomOrder(host_id, order);

        let newPollsOrder = room.pollOrder;
        let allPolls = newPollsOrder['closed'].concat(newPollsOrder['open'], newPollsOrder['pending']);
        
        // check to see if already closed 
        for (let i = 0; i < allPolls.length; i++) {
            let poll_id = allPolls[i];

            if(!newPollsOrder['closed'].includes(poll_id)) {
                await pollFuncs.closePoll(host_id, room_id, poll_id);
            }
        }
        
        let roomData = {
            id: room_id,
            title: room.title,
            status: 'closed',
            hosts: room['hosts'],
            pollOrder: await pollFuncs.getPollOrder(host_id, room_id)
        }

        await firestore
                .collection(host_id)
                .doc(room_id)
                .update({ roomHash: await hashFuncs.generateRoomHash(roomData) });

        return {
            rooms: rooms,
            order: order
        }
    } catch(error) {
        console.log(error)
    }
}

const updateRoomStatus = async (host_id, room_id, new_status, user) => {
    let user_id = loginFuncs.getUserName(user);
    if (!(await loginFuncs.isHostOfRoom(user_id, room_id))) {
        return "You are not the host! Call to updateRoomStatus cancelled.";
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
                    .collection('liveRooms')
                    .doc(room_id)
                    .set({ host_id: host_id })
            }
            else if(new_status === 'closed') {
                // set polls to be closed
                let newPollsOrder = room.pollOrder;
                let allPolls = newPollsOrder['closed'].concat(newPollsOrder['open'], newPollsOrder['pending']);
                
                // check to see if already closed 
                for (let i = 0; i < allPolls.length; i++) {
                    let poll_id = allPolls[i];

                    if(!newPollsOrder['closed'].includes(poll_id)) {
                        await pollFuncs.updatePollStatus(host_id, room_id, poll_id, 'closed', user);
                    }
                }
            }
            
            let roomData = {
                id: room_id,
                title: room.title,
                status: new_status,
                hosts: room['hosts'],
                pollOrder: await pollFuncs.getPollOrder(host_id, room_id)
            }

            await firestore
                .collection(host_id)
                .doc(room_id)
                .update({ roomHash: await hashFuncs.generateRoomHash(roomData) });

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
                    polls[poll_id] = await pollFuncs.fetchPollData(host_id, room_id, poll_id);
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
        let pollOrder = await pollFuncs.getPollOrder(host_id, room_id);
        let closedPolls = pollOrder.closed;

        const pollsResults = {};

        for (let i = 0; i < closedPolls.length; i++) {
            const poll_id = closedPolls[i];
            const poll_result = await pollFuncs.getPollResults(host_id, room_id, poll_id, host_id);
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

const fetchRoomData = async (host_id, room_id) => {
    try {
        let roomRef = firestore
                        .collection(host_id)
                        .doc(room_id);
        let roomSnap = await roomRef.get();
        let roomData = roomSnap.data();

        return {
            id: roomData.id,
            title: roomData.title,
            status: roomData.status,
            pollOrder: await pollFuncs.getPollOrder(host_id, room_id),
            hosts: roomData.hosts
        }
    } catch (error) {
        console.log(error);
    }
}

const uploadVoters = async (room_id, voters) => {
    try {
        voters = voters.flat();
        voters = voters.filter((i) => i !== '');

        await firestore
                .collection('voting')
                .doc(room_id)
                .set({
                    voters: voters
                });

        return true;
    } catch(error) {
        console.log(error);
    }
}

exports.fetchRoomData = fetchRoomData;
exports.fetchHostRooms = fetchHostRooms;
exports.deleteHostRoom = deleteHostRoom;
exports.addHostRoom = addHostRoom;
exports.updateRoom = updateRoom;
exports.setRoomOrder = setRoomOrder;
exports.checkRoomcode = checkRoomcode;
exports.setPollOrder = setPollOrder;
exports.updateRoomStatus = updateRoomStatus;
exports.getRoomResults = getRoomResults;
exports.getHost = getHost;
exports.closeRoom = closeRoom;
exports.uploadVoters = uploadVoters;