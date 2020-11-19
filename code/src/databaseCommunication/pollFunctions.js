import firebase from './permissions.js';
// import { generatePollHash, generateRoomHash, compareHashes } from './hashFunctions';
// import { pollBase } from '../store/dataBases';
// import { fetchHostRooms, setPollOrder, getHost, fetchRoomData } from './roomFunctions';
// import { userIsHost, getToken, userIsVoter, userIsHostOfRoom } from '../LoginUtils.js';
import { fetchGet, fetchPost, fetchPut, fetchDelete } from "./fetchFunctions";
// const firestore = firebase.firestore()

// function generatePollId() {
//     const id = Math.floor(Math.random() * 100);
//     const poll_id = `00${id}`;

//     return poll_id.slice(-2);
// }

// function generateUserOptionId() {
//     const id = Math.floor(Math.random() * 1000);
//     const poll_id = `000${id}`;

//     return poll_id.slice(-3);
// }

const fetchPollData = async (host_id, room_id, poll_id) => {
    try {
        let url = `https://facultyvoting.hamilton.edu:4000/poll/fetchPollData?host_id=${host_id}&room_id=${room_id}&poll_id=${poll_id}`;
        let response = await fetchGet(url);
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to fetch poll data for poll ${poll_id} in room ${room_id} from host ${host_id}`;
        }
    } catch (error) {
        console.log(error);
    }
}

const updatePoll = async (host_id, room_id, poll_id, poll_state) => {
    // if (!userIsHost(host_id)) {
    //     throw "user is not host";
    // } else {
        try {
            let url = `https://facultyvoting.hamilton.edu:4000/poll/updatePoll`;
            let user = firebase.auth().currentUser;
            
            let response = await fetchPut(url, { host_id: host_id,
                                                 room_id: room_id,
                                                 poll_id: poll_id,
                                                 poll_state: poll_state,
                                                 user: user });
            const data = await response.json();
            if(response.status == 200) {
                return data;
            }
            else {
                throw `Failed to update poll ${poll_id} in room ${room_id} from host ${host_id}`;
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    // }
}

const fetchAgenda = async (host_id, room_id) => {
// const fetchAgenda = async (room_id) => {
    try {
        let url = `https://facultyvoting.hamilton.edu:4000/poll/fetchAgenda?host_id=${host_id}&room_id=${room_id}`;
        let response = await fetchGet(url);
        //console.log(response)
        const data = await response.json();
        //console.log(data)
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to fetch agenda for room ${room_id} from host ${host_id}`;
        }
    } catch (error) {
        console.log(error);
    }
}

const addPoll = async (host_id, room_id) => {
        try {
            let url = `https://facultyvoting.hamilton.edu:4000/poll/addPoll`;
            let response = await fetchPost(url, { host_id: host_id,
                                                  room_id: room_id });
            const data = await response.json();
            if(response.status == 200) {
                return data;
            }
            else {
                throw `Failed to add poll to room ${room_id} from host ${host_id}`;
            }
        } catch (error) {
                console.log(error);
                throw error
        }

}

const updatePollStatus = async (host_id, room_id, poll_id, new_status) => {
    // NEED TO CHECK DIFFERENCE IN POLLS IN NEW_STATUS AND CURRENT STATE AND THEN DELETE THOSE POLLS
    // if (!userIsHost(host_id)) {
	//     throw "user is not host";
    // } else {
        try {
            let url = `https://facultyvoting.hamilton.edu:4000/poll/updatePollStatus`;
            let response = await fetchPut(url, { host_id: host_id,
                                                 room_id: room_id,
                                                 poll_id: poll_id,
                                                 new_status: new_status });
            const data = await response.json();
            if(response.status == 200) {
                return data;
            }
            else {
                throw `Failed to update poll status for poll ${poll_id} in room ${room_id} from host ${host_id}`;
            }
        } catch (error) {
            console.log(error);
            throw 'Firebase error';
        }
    // }
}

const getPollResults = async (user_id, room_id, poll_id, host_id = null) => {
    try {
        let url = `https://facultyvoting.hamilton.edu:4000/poll/getPollResults?user_id=${user_id}&room_id=${room_id}&poll_id=${poll_id}&host_id=${host_id}`;
        let response = await fetchGet(url);
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to get poll results for poll ${poll_id} in room ${room_id}`;
        }
    } catch (error) {
        console.log(error);
    }
}

// selection = what is selected when the vote is submitted (bunch of ids)
// submission = what has been voted on in the past
// userInout = what the write-in option is
//           = {id: _,
//              value: _,
//             submission: _
//             }
const submitVote = async (user_id, room_id, poll_id, selection, submission, userInput) => {
    // HERE NEED TO PASS USERS USERNAME THROUGH SO EXPRESS CAN CHECK
    // if (!(await userIsVoter())) {
    //     alert("You do not have voting rights. Speak to the Dean of Faculty if you believe this is an error.");
    //     throw "user does not have voting rights";
    // } else {
        try {
            let url = `https://facultyvoting.hamilton.edu:4000/poll/submitVote`;
            user_id = await firebase.auth().currentUser.getIdToken();
            let response = await fetchPut(url, { user_id: user_id,
                                                 room_id: room_id,
                                                 poll_id: poll_id,
                                                 selection: selection,
                                                 submission: submission,
                                                 userInput: userInput });
            const data = await response.json();
            if(response.status == 200) {
                return data;
            }
            else {
                throw `Failed to submit vote on poll ${poll_id} in room ${room_id} for user ${user_id}`;
            }
        } catch (error) {
            console.log(error);
        }
    // }
}


const getPollOrder = async (host_id, room_id) => {
    try {
        let url = `https://facultyvoting.hamilton.edu:4000/poll/getPollOrder?host_id=${host_id}&room_id=${room_id}`;
        let response = await fetchGet(url);
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to get poll order for room ${room_id} from host ${host_id}`;
        }
    } catch(error) {
        console.log(error);
    }
}

// const countVotes = async (host_id, room_id, poll_id) => {
//     try {
//         let votes = {};
//         let voteRef = firestore
//                         .collection(host_id)
//                         .doc(room_id)
//                         .collection('polls')
//                         .doc(poll_id)
//                         .collection('Votes')
//                         .doc('votes');
//         let voteSnap = await voteRef.get();
//         let voteData = voteSnap.data();
        
//         for(const[key, value] of Object.entries(voteData)) {
//             let choices = value.choice;
//             //console.log(choices)
//             for(let i = 0; i < choices.length; i++) {
//                 if(votes[choices[i]]) {
//                     votes[choices[i]]++;
//                 }
//                 else {
//                     votes[choices[i]] = 1;
//                 } 
//             }
//         }

//         await voteRef.update({
//             finalVotes: votes
//         })
        
//         return;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

const deletePoll = async (host_id, room_id, poll_id) => {
    try {
        let url = `https://facultyvoting.hamilton.edu:4000/poll/deletePoll`;
        let response = await fetchDelete(url, { host_id: host_id,
                                                room_id: room_id,
                                                poll_id: poll_id });
        const data = await response.json();
        if(response.status == 200) {
            return data;
        }
        else {
            throw `Failed to delete poll ${poll_id} in room ${room_id} from host ${host_id}`;
        }
    } catch(error) {
        console.log(error);
    }
}

export { fetchAgenda, addPoll, updatePollStatus, fetchPollData, getPollResults, updatePoll, submitVote, getPollOrder, deletePoll };
