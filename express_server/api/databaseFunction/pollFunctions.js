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

const fetchPollData = async (host_id, room_id, poll_id) => {

    if ( host_id === "null" || host_id === null ){
        host_id = await roomFuncs.getHost(room_id);
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

        ////console.log(poll.optionsOrder)

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

          ////console.log(option_id);

          var opt = {
              id: optDocData['id'],
              value: optDocData['value'],
              //count: optDocData['count']
          };

          poll.options[option_id] = opt;
          ////console.log(poll.options);
        }

        // Check the hash to make sure it's good
	    let hashComparison = await hashFuncs.compareHashes(poll, docData['pollHash'], "poll");
        if (!hashComparison) {
            // hash is bad:
            console.log("\n\n!!Warning!! Data fetched from poll " + docData['title'] + " has a bad hash. This means that the data has been tampered with via the Firebase Console!\n\n");
	    console.log(JSON.stringify(poll));
            //alert("Bad hash warning - see console for more info.");
        }
        //console.log(poll)
	    return poll;
    } catch (error) {
        //console.log(error);
    }
}

const updatePoll = async (host_id, room_id, poll_id, poll_state, user) => {
    let user_id = loginFuncs.getUserName(user);
    if (!(await loginFuncs.isHostOfRoom(user_id, room_id))) {
        console.log("You are not the host! Call to addHostRoom cancelled.");
    } else {
        try {
            let options = poll_state.options;
            let original_state = {...poll_state};
            ////console.log(original_state);
            let pollRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id);

            delete poll_state.options;

            poll_state['pollHash'] = await hashFuncs.generatePollHash(original_state);
            
            await pollRef.update(poll_state);

            for(const [key, value] of Object.entries(options)) {
                ////console.log(opt)
                await pollRef.collection('Options').doc(key).set(value)
            };
            ////console.log(original_state);
            return {
                ...original_state
            };
        } catch (error) {
            //console.log(error);
        }
    }
}

const fetchAgenda = async (host_id, room_id) => {
// const fetchAgenda = async (room_id) => {
    
    if ( host_id === "null" || host_id === null ){
        host_id = await roomFuncs.getHost(room_id);
    }

    try {
        let agenda = { polls: {}, order: {} };
	    let fetchedHash = "";

        let roomSnap = await firestore.collection(host_id).doc(room_id).get();
        ////console.log(host_id)
        ////console.log(room_id)
        let roomData = roomSnap.data();
        ////console.log(roomData)
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
            // hash is bad:
            //console.log("!!Warning!! Data fetched from agenda " + room['id'] + " has a bad hash. This means that the data has been tampered with via the Firebase Console!");
            //alert("Bad hash warning - see console for more info.");
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
        //console.log(error);
    }
}

const addPoll = async (host_id, room_id) => {
    if (false) { //!(await userIsHost(host_id))) {
	//console.log("You are not the host! Call to addHostRoom cancelled.");
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
                ////console.log(opt)
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
                    pending: adm.firestore.FieldValue.arrayUnion(poll_id)
                });

            // Get the room info so we can compute new hash
            // //console.log(roomFuncs)
            // //console.log(roomFuncs.fetchRoomData)
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
                //console.log(error);
        }
    }
}

const updatePollStatus = async (host_id, room_id, poll_id, new_status) => {
    // NEED TO CHECK DIFFERENCE IN POLLS IN NEW_STATUS AND CURRENT STATE AND THEN DELETE THOSE POLLS
    if (false) { //!userIsHost(host_id)) {
	//console.log("You are not the host! Call to addHostRoom cancelled.");
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

            await roomFuncs.setPollOrder(host_id, room_id, newOrder);

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
                //console.log(error);
        }
    }
}

const getPollResults = async (user_id, room_id, poll_id, host_id = null) => {

    // USE user_id TO CHECK IF THEY CAN SEE RESULTS
    if (host_id !== "null" ) { 
        host_id = host_id 
    }
    else { 
        host_id = await roomFuncs.getHost(room_id); 
    }
    // const host_id = await getHost(room_id);
    //console.log(host_id)
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
        let voteData = voteSnap.data().finalVotes;
        
        for (let i = 0; i < poll.optionsOrder.length; i++) {
            const option_id = poll.optionsOrder[i];

            results[option_id] = {
                id: option_id,
                count: voteData[option_id]
            };
            ////console.log(results[option_id].count)
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
        //console.log(error);
    }
}

const submitVote = async (user_id, room_id, poll_id, selection, submission, userInput) => {
    if(false) {
        // check is user is voter
    }
    else {
        try {
            const host_id = await roomFuncs.getHost(room_id);
            let poll = await fetchPollData(host_id, room_id, poll_id);
	    
	    // voteRef is the collection of all votes, like the "ballot box"
            let voteRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id)
                            .collection('Votes')
                            .doc('votes');

            // let docSnap = await voteRef.get();
            // let docData = docSnap.data();
	    
            let vote = {};
            let choice = [];
                
            // Go through every default option in the poll
                for (let i = 0; i < poll.optionsOrder.length; i++) {
                    let option_id = poll.optionsOrder[i];
            
                    if(selection[option_id]) {
                        // if we voted on this choice, add it to the list
                        choice.push(option_id);
                    } 
                    // else if(submission[option_id] && !selection[option_id]) {
                    //     // If we have previously submitted but now it's not selected, delete
                    //     // (This seems pointless, since we are defining choice above)
                    //     choice = choice.filter(item => item !== option_id);
                    // }
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
                    //console.log('exists')
                    inputcode = vals[userInput.value];
                    exists = true;
                }
                // Otherwise, this is the first time this choice has been submitted
                else {
                    //console.log('does not already exist')
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

                // upload to firebase
                // if (docData[user_id]) {//peppered_token]) {
                //     await voteRef.update(vote);
                // } else {
                await voteRef.update(vote);
                // }
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

// const submitVote = async (user_id, room_id, poll_id, selection, submission, userInput) => {
//     // TODO (Jack): Need to update hash of the poll

//     // USER user_id to check if have voting status

//     const host_id = await roomFuncs.getHost(room_id);
//     if (false) {//!(await userIsVoter())) {
//         //console.log("You do not have voting rights! Call to submitVote cancelled.");
//         alert("You do not have voting rights. Speak to the Dean of Faculty if you believe this is an error.");
//     } else {
//         try {
//             let poll = await fetchPollData(host_id, room_id, poll_id);
//             //let token = loginFuncs.getToken();
//             let token = user_id;            
//             let voteRef = firestore
//                                 .collection(host_id)
//                                 .doc(room_id)
//                                 .collection('polls')
//                                 .doc(poll_id)
//                                 .collection('Votes')
//                                 .doc('votes');
//             let docSnap = await voteRef.get();
//             let docData = docSnap.data();

//             let multi_vote = {};
//             multi_vote[token] = { choice: [] };
            
//             for (let i = 0; i < poll.optionsOrder.length; i++) {
//                 let option_id = poll.optionsOrder[i];
//                 let vote = {};

//                 if(poll.type === 'single') {
//                     vote[token] = { choice: [option_id] };
//                     if(selection[option_id] && docData[token]) {    
//                         await voteRef.update(vote);   
//                     }
//                     else if(selection[option_id]) {
//                         await voteRef.set(vote);
//                     }
//                 }
//                 else {
//                     //let multi_token = token + option_id;
//                     let choices = multi_vote[token]["choice"];
                    
//                     if(selection[option_id]) {    
//                         multi_vote[token]["choice"] = choices.concat([option_id]);
//                         //await voteRef.update(vote);   
//                     }
//                     // else if(selection[option_id]) {
//                     //     await voteRef.update(vote);
//                     // }
//                     if(submission[option_id] && !selection[option_id]) {
//                         // //console.log(option_id)
//                         // //console.log(multi_token)
//                         multi_vote[token]["choice"] = choices.filter(item => item !== option_id);
//                         // vote[multi_token] = firebase.firestore.FieldValue.delete();
//                         // await voteRef.update(vote)
//                     }
//                     if(multi_vote[token]["choice"].length > 0) {
//                         //console.log("HERE")
//                         await voteRef.update(multi_vote);
//                     }
//                 }
//             }
//             console.log('single done')
//             // THE ABOVE WORKS PROPERLY

//             let inputcode = null;
//             let exists = false;
//             let userCollectRef = firestore
//                             .collection(host_id)
//                             .doc(room_id)
//                             .collection('polls')
//                             .doc(poll_id)
//                             .collection('userOptions');
            
//             if (selection[userInput.id]) {           
//                 let existingValuesSnap = await userCollectRef.doc('order').get();
//                 let existingValuesData = existingValuesSnap.data();
//                 let vals = existingValuesData.values;
                
//                 if (Object.keys(vals).includes(userInput.value)) {
//                     //console.log('exists')
//                     inputcode = vals[userInput.value];
//                     exists = true;
//                 }
//                 else {
//                     //console.log('genny')
//                     inputcode = generateUserOptionId();
//                 }

//                 vals[userInput.value] = inputcode;

//                 await userCollectRef.doc('order').update({
//                     values: vals
//                 });
//             }
//             else {
//                 //console.log(userInput)
//                 inputcode = userInput.submissionId
//             }
//             ////console.log(inputcode)
//             if(inputcode)  {
//                 let vote = {};
//                 vote[token] = { choice: inputcode };
                
//                 if(poll.type === 'single') {
//                     if (!exists) {    
//                         const userInputResult = {
//                             id: inputcode,
//                             value: userInput.value
//                             //count: 1
//                         }

//                         // add vote to firebase
//                         await userCollectRef.doc(inputcode).set(userInputResult);
                    
//                         if(docData[token]) {    
//                             await voteRef.update(vote);   
//                         }
//                         else {
//                             await voteRef.set(vote);
//                         }
//                     }
//                     else {
//                         // //console.log(submission)
//                         // //console.log(selection)
//                         //let docSnap = await userCollectRef.doc(inputcode).get();
//                         // let count = docSnap.data()['count'];

//                         // if (submission['000']) {
//                         //     await userCollectRef.doc(inputcode).update({ count: count - 1 });
//                         // }
//                         if (selection['000']) {
//                             //await userCollectRef.doc(inputcode).update({ count: count + 1 });
//                             await voteRef.set(vote)
//                         }
//                     }
//                 }
//                 else {
//                     if (!exists) {    
//                         const userInputResult = {
//                             id: inputcode,
//                             value: userInput.value
//                             //count: 1
//                         }

//                         // add vote to firebase
//                         await userCollectRef.doc(inputcode).set(userInputResult);
//                     }
                    
//                     multi_vote[token]["choice"] = multi_vote[token]["choice"].concat([inputcode]);  

//                     if(!selection['000'] && submission['000']) {
//                         multi_vote[token]["choice"] = multi_vote[token]["choice"].filter(item => item !== inputcode);
//                     }

//                     if(multi_vote[token]["choice"].length > 0) {
//                         ////console.log("HERE")
//                         await voteRef.update(multi_vote);
//                     }
//                 }
//             }
            
//             return {
//                 submitted: true,
//                 inputSubmissionId: inputcode
//             }

//         } catch (error) {
//             //console.log(error);
//         }
//     }
// }

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
        //console.log(error);
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
            ////console.log(choices)
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
        //console.log(error);
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
        //console.log(error);
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
// module.exports = {  fetchAgenda, 
//                     //addPoll, 
//                     updatePollStatus, 
//                     fetchPollData, 
//                     getPollResults, 
//                     updatePoll, 
//                     submitVote, 
//                     getPollOrder, 
//                     deletePoll };
