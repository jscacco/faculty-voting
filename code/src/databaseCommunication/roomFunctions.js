import firebase from './permissions.js';
// import { roomBase } from '../store/dataBases';
// import { addPoll, fetchAgenda, updatePollStatus, fetchPollData, getPollResults, getPollOrder, deletePoll } from './pollFunctions';
// import { generateRoomHash, generatePollHash, compareHashes } from './hashFunctions';
// import { userIsHost, userIsVoter } from '../LoginUtils.js';

import { getToken } from "../LoginUtils";
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "./fetchFunctions";

// const firestore = firebase.firestore();
// const fireauth = firebase.auth();

// function generateRoomCode() {
//     const code = Math.floor(Math.random() * 10000);
//     const roomcode = `0000${code}`;

//     return roomcode.slice(-4);
// }

// const checkRoomcode = async (host_id, room_id) => {
const checkRoomcode = async (room_id) => {
    try {
        let url = `http://localhost:4000/room/CheckRoomcode?room_id=${room_id}`; //https://facultyvoting.hamilton.edu
        let response = await fetchGet(url);
        if(response.status === 200) {
            const data = await response.json();
            return data;
        }
        else {
            throw `Roomcode ${room_id} is either pending or not valid`;
        }
    } catch(error) {
        console.log(error);
    }
}

// const checkRoomStatuses = async (rooms, order) => {
//     // Ensure that all rooms' status matches the array they're in in order
//     // (if they don't all match, the information was changed without updating the hash
//     //console.log(typeof rooms);
//     for (let roomKey in rooms) {
//         let room = rooms[roomKey];
//         let roomStatus = room['status'];
//         if (!(order[roomStatus].indexOf(room['id']) > -1)) {
//             console.log("!!Warning!! Room status in " + room['title'] + " has been changed. This means that the data has been tampered with via the Firebase Console!");
//             alert("Bad status warning - see console for more info.");
//             return false;
//         }
//     }

//     // all good
//     return true;
// }

const fetchHostRooms = async (host_id) => {
    try {
        let url = `http://localhost:4000/room/fetchHostRooms?host_id=${host_id}`;
        let response = await fetchGet(url);

        if(response.status == 200) {
            const data = await response.json();
            return data;
        }
        else if(response.status == 505) {
            const data = await response.text();
            alert(data);
        }
        else {
            throw `Failed to fetch rooms for host ${host_id}`;
        }
    } catch (error) {
        console.log(error);
    }
}

const setRoomOrder = async (host_id, new_order) => {
    try {
        //console.log(new_order)
        let url = `http://localhost:4000/room/fetchHostRooms`;
        let response = await fetchPut(url, { host_id: host_id,
                                             new_order: new_order });
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to set room order for host ${host_id}`;
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteHostRoom = async (host_id, room_id) => {
    try {
        let url = `http://localhost:4000/room/deleteHostRoom`;
        let response = await fetchDelete(url, { host_id: host_id, 
                                                room_id: room_id });
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to delete room ${room_id} from host ${host_id}`;
        }
    } catch (error) {
        console.log(error);
    }
}

const addHostRoom = async (host_id, user) => {
    // if (!userIsHost(host_id)) {
	//     throw "user is not host";
    // } else {
        try {
            let user = firebase.auth().currentUser;
            let url = `http://localhost:4000/room/addHostRoom`;
            let response = await fetchPost(url, { host_id: host_id,
                                                  user: user });
            const data = await response.json();
            if(response.status == 200) {
                return data;
            }
            else {
                throw `Failed to add host room for ${host_id}`;
            }
        } catch (error) {
                console.log(error);
        }
    // }
}

const updateRoom = async (host_id, room_id, room_state) => {
    // if (!userIsHost(host_id)) {
    //     throw "user is not host";
    // } else {
        try {
            let user = firebase.auth().currentUser;
            let url = `http://localhost:4000/room/updateRoom`;
            let response = await fetchPut(url, { host_id: host_id, 
                                                 room_id: room_id, 
                                                 room_state: room_state,
                                                 user: user });
            
            // console.log(response)
            if(response.status == 200) {
                const data = await response.json();
                return data;
            }
            else if(response.status == 505) {
                const data = await response.text();
                alert(data);
            }
            else {
                throw `Failed to update room ${room_id} for host ${host_id}`;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    // }
}

const setPollOrder = async (host_id, room_id, new_order) => {
    // TODO: move this to roomFunctions.js
    // changes the order of the polls in the room

    // if (!userIsHost(host_id)) {
	//     throw "user is not host";
    // } else {
        try {
            let user = firebase.auth().currentUser;
            let url = `http://localhost:4000/room/setPollOrder`;
            let response = await fetchPut(url, { host_id: host_id, 
                                                 room_id: room_id, 
                                                 new_order: new_order,
                                                 user: user });
            
            if(response.status == 200) {
                const data = await response.json();
                return data;
            }
            else if(response.status == 505) {
                const data = await response.text();
                alert(data);
            }
            else {
                throw `Failed to set poll order in room ${room_id} for host ${host_id}`;
            }
        } catch (error) {
                console.log(error);
                throw error
        }
    // }
}

const getHost = async (room_id) => {
    try {
        let url = `http://localhost:4000/room/getHost?room_id=${room_id}`;
        let response = await fetchGet(url);
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to get host for room ${room_id}`;
        }
    } catch(error) {
        console.log(error)
    }
}

const updateRoomStatus = async (host_id, room_id, new_status) => {
    // if (!userIsHost(host_id)) {
	//     throw "user is not host";
    // } else {
        try {
            let user = firebase.auth().currentUser;
            let url = `http://localhost:4000/room/updateRoomStatus`;
            let response = await fetchPut(url, { host_id: host_id, 
                                                 room_id: room_id, 
                                                 new_status: new_status,
                                                 user: user });
            
            if(response.status == 200) {
                const data = await response.json();
                return data;
            }
            else if(response.status == 505) {
                const data = await response.text();
                alert(data);
            }
            else {
                throw `Failed to update room status for room ${room_id} for host ${host_id}`;
            }
        } catch(error) {
                console.log(error)
                throw error
        }
    // }
}

const getRoomResults = async (host_id, room_id) => {
    try {
        let url = `http://localhost:4000/room/getRoomResults?host_id=${host_id}&room_id=${room_id}`;
        let response = await fetchGet(url);
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to get room results for room ${room_id} from host ${host_id}`;
        }
    } catch(error) {
        console.log(error);
    }
}

const fetchRoomData = async (host_id, room_id) => {
    try {
        let url = `http://localhost:4000/room/fetchRoomData?host_id=${host_id}&room_id=${room_id}`;
        let response = await fetchGet(url);
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to fetch room data from room ${room_id} for host ${host_id}`;
        }
    } catch (error) {
        console.log(error);
    }
}

const uploadVoters = async (room_id, voters) => {
    try {
        let url = `http://localhost:4000/room/uploadVoters`;
        let response = await fetchPut(url, {
                                                room_id: room_id,
                                                voters: voters
                                           });
        //const data = await response.json();
        if(response.status == 200) {
            return;
        }
        else {
            throw `Failed to fetch upload voters for room ${room_id}`;
        }
    } catch(error) {
        console.log(error);
    }
}

export { fetchRoomData, fetchHostRooms, deleteHostRoom, addHostRoom, updateRoom, setRoomOrder, checkRoomcode, setPollOrder, updateRoomStatus, getRoomResults, getHost, uploadVoters }
