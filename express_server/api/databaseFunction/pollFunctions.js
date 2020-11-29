const roomFuncs = require('./roomFunctions');
const hashFuncs = require('./hashFunctions');
const loginFuncs = require('./loginUtils');
const pollBase = require('./dataBases').pollBase;
const admin = require('./permissions');
const adm = admin.admin;
const firebase = admin.firebase;
const firestore = admin.firestore;

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

const fetchPollData = async (host_id, room_id, poll_id, fetch=false) => {

    if ( host_id === "null" || host_id === null ){
        host_id = await roomFuncs.getHost(room_id);
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

          var opt = {
              id: optDocData['id'],
              value: optDocData['value'],
          };

          poll.options[option_id] = opt;
        }

        // Check the hash to make sure it's good
	    let hashComparison = await hashFuncs.compareHashes(poll, docData['pollHash'], "poll");
        
        if (!hashComparison && !fetch) {
            // roomFuncs.closeRoom(host_id, room_id);
            // await closePoll(host_id, room_id, poll_id);
            return `!!Warning!! Data fetched from poll ${docData['title']} has a bad hash. This means that the data has been tampered with via the Firebase Console!`;
        }

	    return poll;
    } catch (error) {
        console.log(error);
    }
}

const updatePoll = async (host_id, room_id, poll_id, poll_state, user) => {
    let user_id = loginFuncs.getUserName(user);
    if (!(await loginFuncs.isHostOfRoom(user_id, room_id))) {
        return "You are not the host! Call to updatePoll cancelled.";
    } else {
        try {
            let options = poll_state.options;
            let original_state = {...poll_state};
            
            let pollRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id);

            delete poll_state.options;

            for(const [key, value, type] of Object.entries(original_state.options)) {
                if(value.optionType) {
                    delete original_state.options[key].optionType
                }
            }

            poll_state['pollHash'] = await hashFuncs.generatePollHash(original_state);
            
            await pollRef.update(poll_state);

            for(const [key, value] of Object.entries(options)) {
                await pollRef.collection('Options').doc(key).set(value);
            }
            
            return {
                ...original_state
            };
        } catch (error) {
            console.log(error);
        }
    }
}

const fetchAgenda = async (host_id, room_id) => {
    if ( host_id === "null" || host_id === null ){
        host_id = await roomFuncs.getHost(room_id);
    }

    try {
        let agenda = { polls: {}, order: {} };
	    let fetchedHash = "";

        let roomSnap = await firestore.collection(host_id).doc(room_id).get();
        let roomData = roomSnap.data();
        
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

        let hashComparison = await hashFuncs.compareHashes(room, fetchedHash, "room");
        if (!hashComparison) {
            await roomFuncs.closeRoom(host_id, room_id);
            return `!!Warning!! Data fetched from agenda ${room['id']} has a bad hash. This means that the data has been tampered with via the Firebase Console!`;
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

const addPoll = async (host_id, room_id, user) => {
    let user_id = loginFuncs.getUserName(user);
    if (!(await loginFuncs.isHostOfRoom(user_id, room_id))) {
        return "You are not the host! Call to addPoll cancelled.";
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

            // Set a pepper for this poll
            await hashFuncs.addPollPepper(room_id, poll_id);
	    
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
            let thisHash = await hashFuncs.generatePollHash(poll);
            poll.pollHash = thisHash;

            delete poll.options;
            delete poll.results;

            // add poll minus options to firebase (hash is updated here)
            await pollRef.set(poll);

            // fill out the options of the poll (in the correct location)
            for(const opt of Object.entries(options)) {
                pollRef.collection('Options').doc(opt[1].id.toString()).set({
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
                        pending: adm.firestore.FieldValue.arrayUnion(poll_id)
                    });

            // Get the room info so we can compute new hash
            let newRoom = await roomFuncs.fetchRoomData(host_id, room_id);
                
            // Generate the new hash
            let newHash = await hashFuncs.generateRoomHash(newRoom);

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

const closePoll = async (host_id, room_id, poll_id) => {
    try {
        await firestore
                .collection('liveRooms')
                .doc(room_id)
                .set({ host_id: host_id })

        // new poll map
        let newPoll = await fetchPollData(host_id, room_id, poll_id, true);
        const oldStatus = newPoll.status;
        newPoll.status = 'closed';
        newPoll.title = newPoll.title += ' | closed because of bad hash';
        // generate new poll hash
        let newHash = await hashFuncs.generatePollHash(newPoll);
        var docSnap = await firestore.collection(host_id).doc(room_id).collection('polls').doc('order').get();

        const newOrder = {...docSnap.data()};
        newOrder[oldStatus] = newOrder[oldStatus].filter(i => i !== poll_id);
        newOrder['closed'].push(poll_id);

        ///////////////////////
        //await roomFuncs.setPollOrder(host_id, room_id, newOrder, user);
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
            pollOrder: newOrder,
            hosts: roomDocData['hosts']
        };

        // Generate the new hash
        let newRoomHash = await hashFuncs.generateRoomHash(newRoom);
        
        // update room orders in firebase
        await firestore
                .collection(host_id)
                .doc(room_id)
                .collection('polls')
                .doc('order')
                .set(newOrder);

        // update roomHash in firebase
        // if this breaks, roomHash might not exist currently (go into firebase and add it manually
        await firestore
            .collection(host_id)
            .doc(room_id)
            .update({roomHash: newRoomHash});
        ///////////////////////
        
        // update the status and hash of the poll object
        await firestore
                .collection(host_id)
                .doc(room_id)
                .collection('polls')
                .doc(poll_id)
                .update({
                    status: 'closed',
                    title: newPoll.title,
                    pollHash: newHash
                });
        
        await countVotes(host_id, room_id, poll_id);
        
        return await fetchPollData(host_id, room_id, poll_id, true);

    } catch (error) {
        console.log(error);
    }
}

const updatePollStatus = async (host_id, room_id, poll_id, new_status, user) => {
    let user_id = loginFuncs.getUserName(user);
    if (!(await loginFuncs.isHostOfRoom(user_id, room_id))) {
        return "You are not the host! Call to updatePollStatus cancelled.";
    } else {
        try {
            // new poll map
            let newPoll = await fetchPollData(host_id, room_id, poll_id);
            const oldStatus = newPoll.status;
            newPoll.status = new_status;

            // generate new poll hash
            let newHash = await hashFuncs.generatePollHash(newPoll);
            var docSnap = await firestore.collection(host_id).doc(room_id).collection('polls').doc('order').get();

            const newOrder = {...docSnap.data()};
            newOrder[oldStatus] = newOrder[oldStatus].filter(i => i !== poll_id);
            newOrder[new_status].push(poll_id);

            await roomFuncs.setPollOrder(host_id, room_id, newOrder, user);

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
    if (host_id === "null" || host_id === null) { 
        host_id = await roomFuncs.getHost(room_id);
    }
    try {
        let poll = await fetchPollData(host_id, room_id, poll_id, true);
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
        let voteData = voteSnap.data().finalVotes;
        
        for (let i = 0; i < poll.optionsOrder.length; i++) {
            const option_id = poll.optionsOrder[i];

            results[option_id] = {
                id: option_id,
                count: voteData[option_id]
            };
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
                
                // Checks to see if user inputed value has 0 votes
                if(voteData[userCollectSnap.docs[x].id] > 0) {
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
    if(!await loginFuncs.userIsVoter(room_id, user_id)) {
        return "You are not elligible to vote";
    }
    else {
        try {
            console.log('here')
            const host_id = await roomFuncs.getHost(room_id);
            let poll = await fetchPollData(host_id, room_id, poll_id);
            user_id = user_id.uid;
            
            // voteRef is the collection of all votes, like the "ballot box"
            let voteRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id)
                            .collection('Votes')
                            .doc('votes');
	    
            let vote = {};
            let choice = [];
                
            // Go through every default option in the poll
            for (let i = 0; i < poll.optionsOrder.length; i++) {
                let option_id = poll.optionsOrder[i];
        
                if(selection[option_id]) {
                    // if we voted on this choice, add it to the list
                    choice.push(option_id);
                } 
            }
            
            // Now, go through userInput options
            let inputcode = null; // id
            let exists = false;

            // Stores all custom inputs for this poll so far
            let userCollectRef = firestore
                                    .collection(host_id)
                                    .doc(room_id)
                                    .collection('polls')
                                    .doc(poll_id)
                                    .collection('userOptions');
            
            // Check if they created a custom option
            if (selection[userInput.id]) {
                // Get all the values in the docOrder (all previously existing custom options)
                let existingValuesSnap = await userCollectRef.doc('order').get();
                let existingValuesData = existingValuesSnap.data();
                let vals = existingValuesData.values;
                
                // vals['order'] =>
                // values: {
                //      "Jack": 01,
                //      "Chad": 02,
                //      ...
                //      }
            
                // In this case, the option already exists and fetch the existing id for that value
                if (Object.keys(vals).includes(userInput.value)) {
                    inputcode = vals[userInput.value];
                    exists = true;
                }
                // Otherwise, this is the first time this choice has been submitted
                else {
                    inputcode = generateUserOptionId();
                    vals[userInput.value] = inputcode;
                    
                    // Adding the userInput to firebase so we can keep track of the id
                    const userInputResult = {
                        id: inputcode,
                        value: userInput.value
                    }
                    
                    // add new input to firebase
                    await userCollectRef.doc(inputcode).set(userInputResult);

                    // Update our list of existing userInput options
                    await userCollectRef.doc('order').update({
                        values: vals
                    });
                }

                // now that we've taken care of the new input, actually add it to the choice
                choice.push(inputcode);
            }

            // If a userInput was submitted but is not selected, delete it from 'choice'
            // (Again, I think this is pointless since we have just define choice as [])
            if(!selection['000'] && submission['000']) {
                choice = choice.filter(item => item !== inputcode);
            }

            if(choice.length > 0) {
                // generate necessary information
                let token = user_id;
		
                let peppered_token = await hashFuncs.pepperToken(user_id, room_id, poll_id);
                let voteHashInfo = { choices: choice };
                let voteHash = await hashFuncs.generateVoteHash(voteHashInfo, peppered_token, room_id, poll_id);

                // construct vote object
                vote[peppered_token] = {
                    choice: choice,
                    hash: voteHash
                };

                await voteRef.update(vote);
            }
            
            return {
                submitted: true,
                inputSubmissionId: inputcode
            }
            
        } catch (error) {
            console.log(error);
        }
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
            let choices = value.choice;

            for(let i = 0; i < choices.length; i++) {
                if(votes[choices[i]]) {
                    votes[choices[i]]++;
                }
                else {
                    votes[choices[i]] = 1;
                } 
            }
        }

        await voteRef.update({
            finalVotes: votes
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

        let poll = await pollRef.get();
        if(poll.exists) {
            let optionRef = pollRef.collection('Options');
            let userOptionRef = pollRef.collection('userOptions');
            let optionSnap = await optionRef.get();
            let userOptionSnap = await userOptionRef.get();
            let pollOrder = await getPollOrder(host_id, room_id);

            // delete the poll pepper
            await hashFuncs.deletePollPepper(room_id, poll_id);
	    
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

            pollOrder.pending = pollOrder.pending.filter(item => item !== poll_id);
            pollOrder.closed = pollOrder.closed.filter(item => item !== poll_id);
            pollOrder.open = pollOrder.open.filter(item => item !== poll_id);

            await firestore
                    .collection(host_id)
                    .doc(room_id)
                    .collection('polls')
                    .doc('order')
                    .update(pollOrder);

	    
	    
            // delete poll
            await pollRef.delete();
        }
    } catch(error) {
        console.log(error);
    }
}

exports.addPoll = addPoll;
exports.fetchAgenda = fetchAgenda;
exports.updatePollStatus = updatePollStatus;
exports.fetchPollData = fetchPollData;
exports.getPollResults = getPollResults;
exports.updatePoll = updatePoll;
exports.submitVote = submitVote;
exports.getPollOrder = getPollOrder;
exports.deletePoll = deletePoll;
exports.closePoll = closePoll;