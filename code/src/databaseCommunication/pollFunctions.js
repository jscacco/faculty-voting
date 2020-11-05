import firebase from './permissions.js';
import { generatePollHash, generateRoomHash, compareHashes } from './hashFunctions';
import { pollBase } from '../store/dataBases';
import { fetchHostRooms, setPollOrder, getHost, fetchRoomData } from './roomFunctions';
import { userIsHost, getToken } from '../LoginUtils.js';

const firestore = firebase.firestore()

function generatePollId() {
    const id = Math.floor(Math.random() * 100);
    const poll_id = `00${id}`;

    return poll_id.slice(-2);
}

function generateUserOptionId() {
    const id = Math.floor(Math.random() * 1000);
    const poll_id = `000${id}`;

    return poll_id.slice(-3);
}

const fetchPollData = async (host_id, room_id, poll_id) => {

    if ( host_id === null ){
        host_id = await getHost(room_id);
        //console.log(host_id);
    }

    try {
        const document = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id);
        let docSnap = await document.get();
        let docData = docSnap.data();

        let poll = {
            id: poll_id,
            title: docData['title'],
            status: docData['status'],
            type: docData['type'],
            description: docData['description'],
            options: {},
            userInputOption: docData['userInputOption'],
            optionsOrder: docData['optionsOrder'],
            showResults: docData['showResults']
        };

        //console.log(poll.optionsOrder)

        for (let i = 0; i < poll.optionsOrder.length; i++) {
          const option_id = poll.optionsOrder[i];

          const optionRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id)
                            .collection('Options')
                            .doc(option_id);

          let optDocSnap = await optionRef.get();
          let optDocData = optDocSnap.data();

          //console.log(option_id);

          var opt = {
              id: optDocData['id'],
              value: optDocData['value'],
              //count: optDocData['count']
          };

          poll.options[option_id] = opt;
          //console.log(poll.options);
        }

        // Check the hash to make sure it's good
        if (!compareHashes(poll, docData['pollHash'], "poll")) {
            // hash is bad:
            console.log("!!Warning!! Data fetched from poll " + docData['title'] + " has a bad hash. This means that the data has been tampered with via the Firebase Console!");
            alert("Bad hash warning - see console for more info.");
        }

	    return poll;
    } catch (error) {
        console.log(error);
    }
}

const updatePoll = async (host_id, room_id, poll_id, poll_state) => {
    if (!(userIsHost(host_id))) {
        console.log("You are not the host! Call to addHostRoom cancelled.");
    } else {
        try {
            let options = poll_state.options;
            let original_state = {...poll_state};
            //console.log(original_state);
            let pollRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id);

            delete poll_state.options;

            poll_state['pollHash'] = await generatePollHash(original_state);
            
            await pollRef.update(poll_state);

            for(const [key, value] of Object.entries(options)) {
                //console.log(opt)
                await pollRef.collection('Options').doc(key).set(value)
            };
            //console.log(original_state);
            return {
                ...original_state
            };
        } catch (error) {
            console.log(error);
        }
    }
}

const fetchAgenda = async (host_id, room_id) => {
// const fetchAgenda = async (room_id) => {

    if ( host_id === null ){
      host_id = await getHost(room_id);
      console.log(host_id);
    }

    try {
        let agenda = { polls: {}, order: {} };
	    let fetchedHash = "";

        let roomSnap = await firestore.collection(host_id).doc(room_id).get();
        //console.log(host_id)
        //console.log(room_id)
        let roomData = roomSnap.data();
        //console.log(roomData)
        agenda['title'] = roomData['title'];
        agenda['status'] = roomData['status'];
        fetchedHash = roomData['roomHash'];

        let room = {
            id: room_id,
            title: agenda['title'],
            status: agenda['status'],
            pollOrder: await getPollOrder(host_id, room_id),
            hosts: roomData['hosts']
        }

        let hashComparison = await compareHashes(room, fetchedHash, "room");
        if (!hashComparison) {
            // hash is bad:
            console.log("!!Warning!! Data fetched from agenda " + room['id'] + " has a bad hash. This means that the data has been tampered with via the Firebase Console!");
            alert("Bad hash warning - see console for more info.");
        }

        const collect = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls');

        const collectSnap = await collect.get();
        const collectData = collectSnap.docs;

        for (let i = 0; i < collectData.length; i++) {
            const poll_id = collectData[i].id;

            if(poll_id != 'order') {
                agenda['polls'][poll_id] = await fetchPollData(host_id, room_id, poll_id);
            }
            else {
                agenda['order'] = collectData[i].data();
            }
        }

        return agenda;
    } catch (error) {
        console.log(error);
    }
}

const addPoll = async (host_id, room_id) => {
    if (!(userIsHost(host_id))) {
	console.log("You are not the host! Call to addHostRoom cancelled.");
    } else {
        try {
            let poll_id = generatePollId();

            // Make sure we aren't reusing PollId
            let collectRef = firestore
                                .collection(host_id)
                                .doc(room_id)
                                .collection('polls');

            let collectSnap = await collectRef.get();

            let ids = [];
            for(let i = 0; i < collectSnap.docs; i++) {
                if(collectSnap.docs[i].data().exists) {
                    ids.push(collectSnap.docs[i].data().id);
                }
            }

            while(poll_id in ids) {
                poll_id = generatePollId();
            }

            // object we will return
            let poll = pollBase(poll_id);

            // reference to specific poll location
            let pollRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id);

            // remove options right now so firebase doesn't add an unwanted field to the collection
            let options = poll['options'];

            // generate hash here:
            let thisHash = await generatePollHash(poll);
            poll.pollHash = thisHash;

            delete poll.options;
            delete poll.results;

            // add poll minus options to firebase (hash is updated here)
            await pollRef.set(poll);

            // fill out the options of the poll (in the correct location)
            for(const opt of Object.entries(options)) {
                //console.log(opt)
                pollRef.collection('Options').doc(opt[1].id.toString()).set({
                    //count: 0,
                    id: opt[1].id,
                    value: opt[1].value
                })
            };

            // configure firebase to allow storing user options and voting
            await pollRef.collection('userOptions').doc('order').set({ values : {} });
            await pollRef.collection('Votes').doc('votes').set({});

            // At this point, poll is done being created and added to firebase

            // update the poll order in firebase
            await firestore
                .collection(host_id)
                .doc(room_id)
                .collection('polls')
                .doc('order')
                .update({
                    pending: firebase.firestore.FieldValue.arrayUnion(poll_id)
                });

            // Get the room info so we can compute new hash
            let newRoom = await fetchRoomData(host_id, room_id);

            // Generate the new hash
            let newHash = await generateRoomHash(newRoom);

            // update roomHash in firebase
            // if this breaks, roomHash might not exist currently (go into firebase and add it manually
            await firestore
                .collection(host_id)
                .doc(room_id)
                .update({roomHash: newHash});

            return {
                newPoll: poll
            };
        } catch (error) {
                console.log(error);
        }
    }
}

const updatePollStatus = async (host_id, room_id, poll_id, new_status) => {
    if (!(userIsHost(host_id))) {
	console.log("You are not the host! Call to addHostRoom cancelled.");
    } else {
        try {
            // new poll map
            let newPoll = await fetchPollData(host_id, room_id, poll_id);
            const oldStatus = newPoll.status;
            newPoll.status = new_status;

            // generate new poll hash
            let newHash = await generatePollHash(newPoll);
            var docSnap = await firestore.collection(host_id).doc(room_id).collection('polls').doc('order').get();

            const newOrder = {...docSnap.data()};
            newOrder[oldStatus] = newOrder[oldStatus].filter(i => i !== poll_id);
            newOrder[new_status].push(poll_id);

            await setPollOrder(host_id, room_id, newOrder);

            // update the status and hash of the poll object
            await firestore
                    .collection(host_id)
                    .doc(room_id)
                    .collection('polls')
                    .doc(poll_id)
                    .update({
                        status: new_status,
                        pollHash: newHash
                    });

            const polls = await fetchAgenda(host_id, room_id);
            if(new_status === 'closed') {
                await countVotes(host_id, room_id, poll_id);
            }
            return {
                polls: polls['polls'],
                order: newOrder
            }
        } catch (error) {
                console.log(error);
        }
    }
}

const getPollResults = async (user_id, room_id, poll_id, host_id = null) => {

    // USE user_id TO CHECK IF THEY CAN SEE RESULTS
    if (host_id !== null ) { host_id = host_id }
    else { host_id = await getHost(room_id); }
    // const host_id = await getHost(room_id);
    // console.log(host_id)
    try {
        let poll = await fetchPollData(host_id, room_id, poll_id);
        let options = poll.options;
        let results = {};
        let voteRef = firestore
                        .collection(host_id)
                        .doc(room_id)
                        .collection('polls')
                        .doc(poll_id)
                        .collection('Votes')
                        .doc('votes');
        let voteSnap = await voteRef.get();
        let voteData = voteSnap.data().votes;
        
        for (let i = 0; i < poll.optionsOrder.length; i++) {
            const option_id = poll.optionsOrder[i];

            results[option_id] = {
                id: option_id,
                count: voteData[option_id]
            };
            //console.log(results[option_id].count)
        }

        let userCollectRef = firestore
                                .collection(host_id)
                                .doc(room_id)
                                .collection('polls')
                                .doc(poll_id)
                                .collection('userOptions');
        let userCollectSnap = await userCollectRef.get();

        // checks to see if write-in options exist
        if(userCollectSnap.docs.length > 1) {
            for(let x = 0; x < userCollectSnap.docs.length; x++) {
                let optionSnap = await firestore
                                        .collection(host_id)
                                        .doc(room_id)
                                        .collection('polls')
                                        .doc(poll_id)
                                        .collection('userOptions')
                                        .doc(userCollectSnap.docs[x].id)
                                        .get();
                //console.log(userCollectSnap.docs[x].id)
                results[userCollectSnap.docs[x].id] = {
                    id: userCollectSnap.docs[x].id,
                    count: voteData[userCollectSnap.docs[x].id]
                }
                poll.optionsOrder.push(userCollectSnap.docs[x].id);
                poll.options[userCollectSnap.docs[x].id] = {
                    ...results[userCollectSnap.docs[x].id],
                    value: optionSnap.data()['value']
                }
            }
        }

        return {
            title: poll.title,
            description: poll.description,
            optionsOrder: poll.optionsOrder,
            options: {...options},
            results: {...results}
        }
    } catch (error) {
        console.log(error);
    }
}

const submitVote = async (user_id, room_id, poll_id, selection, submission, userInput) => {
    // TODO (Jack): Need to update hash of the poll

    // USER user_id to check if have voting status

    const host_id = await getHost(room_id);
    
    try {
        let poll = await fetchPollData(host_id, room_id, poll_id);
        let token = getToken();
        let voteRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id)
                            .collection('Votes')
                            .doc('votes');
        let docSnap = await voteRef.get();
        let docData = docSnap.data();

        for (let i = 0; i < poll.optionsOrder.length; i++) {
            let option_id = poll.optionsOrder[i];
            let vote = {};
            vote[token] = option_id;

            if(selection[option_id] && docData[token]) {    
                await voteRef.update(vote);   
            }
            else if(selection[option_id]) {
                await voteRef.set(vote);
            }
        }
        // THE ABOVE WORKS PROPERLY

        let inputcode = null;
        let exists = false;

        if (selection[userInput.id]) {
            let userCollectRef = firestore
                                    .collection(host_id)
                                    .doc(room_id)
                                    .collection('polls')
                                    .doc(poll_id)
                                    .collection('userOptions');

            let existingValuesSnap = await userCollectRef.doc('order').get();
            let existingValuesData = existingValuesSnap.data();
            let vals = existingValuesData.values;

            if (Object.keys(vals).includes(userInput.value)) {
                inputcode = vals[userInput.value];
                exists = true;
            }
            else if (!userInput.submissionId) {
                inputcode = generateUserOptionId();

                let userSnap = await userCollectRef.get();
                let userIds = [];
                for(let x = 0; x < userSnap.docs.length; x ++) {
                    userIds.push(userSnap.docs[x].id)
                }

                while (poll.optionsOrder[inputcode]) {
                    inputcode = generateUserOptionId();
                }

                vals[userInput.value] = inputcode;

                await userCollectRef.doc('order').update({
                    values: vals
                })
            }
            else {
                inputcode = userInput.submissionId
            }

            let vote = {};
            vote[token] = inputcode;

            if (!exists) {    
                const userInputResult = {
                    id: inputcode,
                    value: userInput.value
                    //count: 1
                }

                // add vote to firebase
                await userCollectRef.doc(inputcode).set(userInputResult);

                if(docData[token]) {    
                    await voteRef.update(vote);   
                }
                else {
                    await voteRef.set(vote);
                }
            }
            else {
                // console.log(submission)
                // console.log(selection)
                //let docSnap = await userCollectRef.doc(inputcode).get();
                // let count = docSnap.data()['count'];

                // if (submission['000']) {
                //     await userCollectRef.doc(inputcode).update({ count: count - 1 });
                // }
                if (selection['000']) {
                    //await userCollectRef.doc(inputcode).update({ count: count + 1 });
                    await voteRef.set(vote)
                }
            }
        }
        // else if (userInput.submissionId) {
        //     // remove userInput from firebase if only one vote
        //     let docRef = firestore
        //                     .collection(host_id)
        //                     .doc(room_id)
        //                     .collection('polls')
        //                     .doc(poll_id)
        //                     .collection('userOptions')
        //                     .doc(userInput.submissionId);
        //     let docSnap = await docRef.get();

        //     if (docSnap.data().count > 1) {
        //         await docRef.update({ count: docSnap.data().count - 1})
        //     }
        //     else {
        //         await firestore
        //             .collection(host_id)
        //             .doc(room_id)
        //             .collection('polls')
        //             .doc(poll_id)
        //             .collection('userOptions')
        //             .doc(userInput.submissionId)
        //             .delete();
        //     }
        //     //delete poll.results[userInput.submissionId]
        // }

        return {
            submitted: true,
            inputSubmissionId: inputcode
        }

    } catch (error) {
        console.log(error);
    }
}

const getPollOrder = async (host_id, room_id) => {
    try {
        let pollSnap = await firestore
                                .collection(host_id)
                                .doc(room_id)
                                .collection('polls')
                                .doc('order')
                                .get();

        return pollSnap.data();
    } catch(error) {
        console.log(error);
    }
}

const countVotes = async (host_id, room_id, poll_id) => {
    try {
        let votes = {};
        let voteRef = firestore
                        .collection(host_id)
                        .doc(room_id)
                        .collection('polls')
                        .doc(poll_id)
                        .collection('Votes')
                        .doc('votes');
        let voteSnap = await voteRef.get();
        let voteData = voteSnap.data();
        
        for(const[key, value] of Object.entries(voteData)) {
            if(votes[value]) {
                votes[value]++;
            }
            else {
                votes[value] = 1;
            }
        }

        await voteRef.set({
            votes: votes
        })
        
        return;
    }
    catch (error) {
        console.log(error);
    }
}

const deletePoll = async (host_id, room_id, poll_id) => {
    try {
        let pollRef = firestore
                        .collection(host_id)
                        .doc(room_id)
                        .collection('polls')
                        .doc(poll_id);

        let optionRef = pollRef.collection('Options');
        let userOptionRef = pollRef.collection('userOptions');
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

        // delete votes document
        await pollRef.collection('Votes').doc('votes').delete();

        // delete poll
        await pollRef.delete();
    } catch(error) {
        console.log(error);
    }
}

export { fetchAgenda, addPoll, updatePollStatus, fetchPollData, getPollResults, updatePoll, submitVote, getPollOrder, deletePoll };
