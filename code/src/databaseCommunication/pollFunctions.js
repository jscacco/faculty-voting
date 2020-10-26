import firestore from './permissions.js';
//import firebase  from './permissions.js';
import { pollBase } from '../store/dataBases';
import { fetchHostRooms } from './roomFunctions';

function generatePollId() {
    const id = Math.floor(Math.random() * 100);
    const poll_id = `00${id}`;

    return poll_id.slice(-2);
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

          console.log(optDocData);

          var opt = {
              id: optDocData['id'],
              value: optDocData['value'],
              count: optDocData['count']
          };

          poll.options[option_id] = opt;
          console.log(poll.options);
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

        console.log(poll.options)
        return poll;
    } catch (error) {
        throw error;
    }
}

const fetchAgenda = async (host_id, room_id) => {
    try {
        let agenda = { polls: {}, order: {} };

        await firestore.collection(host_id).doc(room_id).get().then(roomSnap => {
            agenda['title'] = roomSnap.data()['roomTitle'];
            agenda['status'] = roomSnap.data()['status'];
        });

        const collect = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls');

        await collect.get().then(snap => {
            //console.log(snap)
            snap.forEach(function (pollSnap) {
            if(pollSnap.id != 'order') {
                var poll = { title: '', status: '', id: '' };
                //console.log(doc)
                poll['id'] = pollSnap.id;
                poll['status'] = pollSnap.data()['status'];
                poll['title'] = pollSnap.data()['title'];
                agenda['polls'][pollSnap.id] = poll;
            }
            else {
                agenda['order']['pending'] = pollSnap.data()['pending'];
                agenda['order']['open'] = pollSnap.data()['open'];
                agenda['order']['closed'] = pollSnap.data()['closed'];
            }
            });
            //return res.status(200).send(agenda);
        });

        return agenda;
    } catch (error) {
        throw error;
    }
}

const addPoll = async (host_id, room_id) => {
    try {
        let poll_id = generatePollId();

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

        let poll = pollBase(poll_id);

        let pollRef = firestore
                      .collection(host_id)
                      .doc(room_id)
                      .collection('polls')
                      .doc(poll_id);

        let options = poll['options'];

        delete poll.options;

        await pollRef.set(poll);

        for(const opt of Object.entries(options)) {
            console.log(opt)
            pollRef.collection('Options').doc(opt[1].id.toString()).set({
                count: 0,
                id: opt[1].id,
                value: opt[1].value
            })
        };

        // temporary until admin sdk is in place
        let pend = [];
        await firestore.collection(host_id).doc(room_id).collection('polls').doc('order').get().then(snap => {
            pend = snap.data()['pending'];
        });

        await firestore
            .collection(host_id)
            .doc(room_id)
            .collection('polls')
            .doc('order')
            .update({
                pending: [...pend, poll_id]//admin.firestore.FieldValue.arrayUnion(poll_id)
            });

        return {
            newPoll: poll
        };
    } catch (error) {
        throw error;
    }
}

const setPollOrder = async (host_id, room_id, new_order) => {
    try {
        await firestore
                .collection(host_id)
                .doc(room_id)
                .collection('polls')
                .doc('order')
                .set(new_order);
        
        return;
    } catch (error) {
        throw error;
    }
}

const updatePollStatus = async (host_id, room_id, poll_id, new_status) => {
    try {
        let newPoll = await fetchPollData(host_id, room_id, poll_id);
        const oldStatus = newPoll.status;
        newPoll.status = new_status;

        var docSnap = await firestore.collection(host_id).doc(room_id).collection('polls').doc('order').get();
        const newOrder = {...docSnap.data()};
        newOrder[oldStatus] = newOrder[oldStatus].filter(i => i !== poll_id);
        newOrder[new_status].push(poll_id);

        await setPollOrder(host_id, room_id, newOrder);
        //console.log(newOrder)
        await firestore
            .collection(host_id)
            .doc(room_id)
            .collection('polls')
            .doc(poll_id)
            .update({
                status: new_status
            });

        const polls = await fetchAgenda(host_id, room_id);

        return {
            polls: polls['polls'],
            order: newOrder
        }
    } catch (error) {
        throw error;
    }
}

const getPollResults = async (host_id, room_id, poll_id) => {
    try {
        let options = {};
        let results = {};
        
        const docRef = await firestore
                        .collection(host_id)
                        .doc(room_id)
                        .collection('polls')
                        .doc(poll_id);

        const docSnap = await docRef.get();
        const docData = docSnap.data();
        
        for (let i = 0; i < docData['optionsOrder'].length; i++) {
            const option_id = docData['optionsOrder'][i];

            const optionRef = firestore
                            .collection(host_id)
                            .doc(room_id)
                            .collection('polls')
                            .doc(poll_id)
                            .collection('Options')
                            .doc(option_id);

            let optDocSnap = await optionRef.get();
            let optDocData = optDocSnap.data();

            //console.log(optDocData);

            var opt = {
                id: optDocData['id'],
                value: optDocData['value'],
                count: optDocData['count']
            };

            var res = {
                id: optDocData['id'],
                count: optDocData['count']
            }

            options[opt.id] = opt;
            results[opt.id] = res;
        }
        
        console.log(docData['title'])

        return {
        title: docData['title'],
        description: docData['description'],
        optionsOrder: docData['optionsOrder'],
        options: {...options},
        results: {...results}
        }
    } catch (error) {
        throw error;
    }
}
  

export { fetchAgenda, addPoll, updatePollStatus, fetchPollData, getPollResults, setPollOrder };
