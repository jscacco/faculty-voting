import firebase from './permissions.js';
import { generatePollHash, generateRoomHash, compareHashes } from './hashFunctions';
import { pollBase } from '../store/dataBases';
import { fetchHostRooms, setPollOrder } from './roomFunctions';

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

        console.log(poll.optionsOrder)

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

          console.log(option_id);

          var opt = {
              id: optDocData['id'],
              value: optDocData['value'],
              count: optDocData['count']
          };

          poll.options[option_id] = opt;
          //console.log(poll.options);
        }

        // const optionRef = firestore
        //                   .collection(host_id)
        //                   .doc(room_id)
        //                   .collection('polls')
        //                   .doc(poll_id)
        //                   .collection('Options');
        //
        // await optionRef.get().then((snap) =>{
        //     snap.forEach(async function (doc) {
        //         await optionRef.doc(doc.id).get().then((docSnap) => {
        //             var opt = {
        //                 id: docSnap.data()['id'],
        //                 value: docSnap.data()['value'],
        //                 count: docSnap.data()['count']
        //             };
        //
        //         poll['options'][docSnap.data()['id']] = opt;
        //         });
        //     });
        // });

        //console.log(poll.options)

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
    try {
        let rooms = await fetchHostRooms(host_id);
        let room = rooms['rooms'][room_id];
        let poll = await fetchPollData(host_id, room_id, poll_id);

        let pollRef = firestore
                        .collection(host_id)
                        .doc(room_id)
                        .collection('polls')
                        .doc(poll_id);

        let options = poll_state.options;
	
        delete poll_state.options;

        await pollRef.update(poll_state);
            
        for(const opt of Object.entries(options)) {
            //console.log(opt)
            pollRef.collection('Options').doc(opt[1].id.toString()).set(opt)
        }; 

        // // update options
        // options.forEach(opt => {
        //   await pollRef.collection('Options').doc(opt.id).update({
        //     count: opt.count,
        //     optionType: opt.optionType,
        //     id: opt.id,
        //     value: opt.value
        //   })
        // });
        
        return {
            ...poll_state
        };
    } catch (error) {
        console.log(error);
    }
}

const fetchAgenda = async (host_id, room_id) => {
    try {
        let agenda = { polls: {}, order: {} };
	    let fetchedHash = "";

        await firestore.collection(host_id).doc(room_id).get().then(roomSnap => {
            agenda['title'] = roomSnap.data()['title'];
            agenda['status'] = roomSnap.data()['status'];
	        fetchedHash = roomSnap.data()['agendaHash'];
        });

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
    try {
        let poll_id = generatePollId();

        // Make sure we aren't reusing PollId
        let collectRef = await firestore
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

	    // join the object and the poll location (hash is updated here)
        await pollRef.set(poll);

	    // fill out the options of the poll (in the correct location)
        for(const opt of Object.entries(options)) {
            //console.log(opt)
            pollRef.collection('Options').doc(opt[1].id.toString()).set({
                count: 0,
                id: opt[1].id,
                value: opt[1].value
            })
        }; 

        await pollRef.collection('userOptions').doc('order').set({ values : {} });

	    // At this point, poll is done being created and added to firebase
	
        // temporary until admin sdk is in place
        let pend = [];
        await firestore.collection(host_id).doc(room_id).collection('polls').doc('order').get().then(snap => {
            pend = snap.data()['pending'];
        });

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
            pollOrder: [...pend, poll_id],
	    hosts: roomDocData['hosts']
        };

        // Generate the new hash
        let newHash = await generateRoomHash(newRoom);

	// update the poll order in firebase
        await firestore
            .collection(host_id)
            .doc(room_id)
            .collection('polls')
            .doc('order')
            .update({
                pending: [...pend, poll_id]//admin.firestore.FieldValue.arrayUnion(poll_id)
            });

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

const updatePollStatus = async (host_id, room_id, poll_id, new_status) => {
    // NEED TO CHECK DIFFERENCE IN POLLS IN NEW_STATUS AND CURRENT STATE AND THEN DELETE THOSE POLLS
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

        return {
            polls: polls['polls'],
            order: newOrder
        }
    } catch (error) {
        console.log(error);
    }
}

const getPollResults = async (host_id, room_id, poll_id) => {
    try {
        let poll = await fetchPollData(host_id, room_id, poll_id);
        let options = poll.options;
        let results = {};
        
        for (let i = 0; i < poll.optionsOrder.length; i++) {
            const option_id = poll.optionsOrder[i];

            results[option_id] = {
                id: option_id,
                count: options[option_id].count
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
                console.log(userCollectSnap.docs[x].id)
                results[userCollectSnap.docs[x].id] = {
                    id: userCollectSnap.docs[x].id,
                    count: optionSnap.data()['count']
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
  
const submitVote = async (host_id, room_id, poll_id, selection, submission, userInput) => {
    // TODO (Jack): Need to update hash of the poll
    try {
        let poll = await fetchPollData(host_id, room_id, poll_id);

        for (let i = 0; i < poll.optionsOrder.length; i++) {
            let option_id = poll.optionsOrder[i];
            let docRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id)
                            .collection('Options')
                            .doc(option_id);
            let docSnap = await docRef.get();
            let count = docSnap.data()['count'];

            if (submission[option_id]) { 
                await docRef.update({ count: count - 1 });
            }
            if (selection[option_id]) { 
                await docRef.update({ count: count + 1 });
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
       
            if (!exists) {
                const userInputResult = {
                    id: inputcode,
                    value: userInput.value,
                    count: 1
                }
                // add vote to firebase
                await userCollectRef.doc(inputcode).set(userInputResult);
            }
            else {
                // console.log(submission)
                // console.log(selection)
                let docSnap = await userCollectRef.doc(inputcode).get();
                let count = docSnap.data()['count'];

                if (submission['000']) { 
                    await userCollectRef.doc(inputcode).update({ count: count - 1 });
                }
                if (selection['000']) { 
                    await userCollectRef.doc(inputcode).update({ count: count + 1 });
                }
            }
        }
        else if (userInput.submissionId) {
            // remove userInput from firebase if only one vote
            let docRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id)
                            .collection('userOptions')
                            .doc(userInput.submissionId);
            let docSnap = await docRef.get();
            
            if (docSnap.data().count > 1) {
                await docRef.update({ count: docSnap.data().count - 1})
            }
            else {
                await firestore
                    .collection(host_id)
                    .doc(room_id)
                    .collection('polls')
                    .doc(poll_id)
                    .collection('userOptions')
                    .doc(userInput.submissionId)
                    .delete();
            }
            //delete poll.results[userInput.submissionId]
        }
        
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

export { fetchAgenda, addPoll, updatePollStatus, fetchPollData, getPollResults, updatePoll, submitVote, getPollOrder };
